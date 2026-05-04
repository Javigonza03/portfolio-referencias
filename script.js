document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const loader = document.querySelector('.lightbox-loader');

    // Open Lightbox
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-letter');
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Reset image
            lightboxImg.style.display = 'none';
            loader.style.display = 'block';
            
            // Load new image
            lightboxImg.src = imgSrc;
            
            lightboxImg.onload = () => {
                loader.style.display = 'none';
                lightboxImg.style.display = 'block';
            };
            
            // Handle error in case image is missing
            lightboxImg.onerror = () => {
                console.error("No se pudo cargar la imagen:", imgSrc);
                loader.textContent = 'Error: No se encontró la imagen en ' + imgSrc;
                // No lo cerramos automáticamente para que el usuario vea el mensaje y lo cierre él
            };
        });
    });

    // Close Lightbox function
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        setTimeout(() => {
            lightboxImg.src = '';
        }, 400); // Wait for transition
    };

    // Close events
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
