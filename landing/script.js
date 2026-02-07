// =====================================
// CONFIGURATION SUPABASE
// =====================================
// ⚠️ REMPLACE CES VALEURS PAR TES VRAIES CREDENTIALS SUPABASE
const SUPABASE_URL = 'TON_URL_SUPABASE'; // Ex: https://abcdefghijk.supabase.co
const SUPABASE_ANON_KEY = 'TA_CLE_ANON_SUPABASE'; // Ta clé publique anon

// Initialiser le client Supabase
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =====================================
// HANDLER FORMULAIRE WAITLIST
// =====================================
async function handleWaitlistSubmit(e, formId) {
    e.preventDefault();
    
    const form = e.target;
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value;
    const submitBtn = form.querySelector('.submit-btn');
    
    // Messages de feedback
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Disable button during submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Inscription...';
    
    try {
        // ✅ Envoyer à Supabase
        const { data, error } = await supabaseClient
            .from('waitlist')
            .insert([
                { email: email }
            ]);
        
        if (error) {
            // Gestion des erreurs
            if (error.code === '23505') {
                // Email déjà inscrit (duplicate key)
                throw new Error('Cet email est déjà inscrit ! 🎉');
            } else {
                throw error;
            }
        }
        
        // ✅ Succès !
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        emailInput.value = '';
        
        // Google Analytics tracking (optionnel)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'waitlist_signup', {
                'event_category': 'engagement',
                'event_label': 'email_signup'
            });
        }
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Rejoindre la waitlist';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
        
        // Scroll to top if bottom form
        if (formId === 'bottom') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
    } catch (error) {
        console.error('Error:', error);
        
        // Afficher le message d'erreur
        errorMessage.textContent = error.message || 'Une erreur est survenue. Réessaie plus tard.';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Rejoindre la waitlist';
    }
}

// =====================================
// ATTACHER LES HANDLERS AUX FORMULAIRES
// =====================================
document.addEventListener('DOMContentLoaded', () => {
    // Formulaire Hero (top)
    const topForm = document.getElementById('waitlistForm');
    if (topForm) {
        topForm.addEventListener('submit', (e) => {
            handleWaitlistSubmit(e, 'top');
        });
    }
    
    // Formulaire section Waitlist (bottom)
    const bottomForm = document.getElementById('waitlistFormBottom');
    if (bottomForm) {
        bottomForm.addEventListener('submit', (e) => {
            handleWaitlistSubmit(e, 'bottom');
        });
    }
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// =====================================
// SMOOTH SCROLL POUR LES ANCRES
// =====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// =====================================
// FAQ ACCORDION
// =====================================
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle l'item actuel
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
