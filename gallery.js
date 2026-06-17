let currentLinks = {};
let scrollY = 0;
let lastScrollY = window.scrollY;
document.querySelectorAll('.onSiteVideo').forEach(function(video) {
    video.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(video);
    });
});
function openModal(video) {
    currentLinks = {
        spotify: video.dataset.spotify,
        apple: video.dataset.apple,
        youtube: video.dataset.youtube
    };
    // Populate modal content
    const cover = video.dataset.cover;
    const title = video.dataset.title;
    const release = video.dataset.release;
    const coverEl = document.getElementById('modalCover');
    const titleEl = document.getElementById('modalTitle');
    const releaseEl = document.getElementById('modalRelease');
    if (cover) {
        coverEl.src = cover;
        coverEl.style.display = 'block';
    } else {
        coverEl.style.display = 'none';
    }
    if (title) {
        titleEl.textContent = title;
        titleEl.style.display = 'block';
    } else {
        titleEl.style.display = 'none';
    }
    if (release) {
        releaseEl.textContent = release;
        releaseEl.style.display = 'block';
    } else {
        releaseEl.style.display = 'none';
    }
    document.getElementById('musicModal').classList.add('show');
    scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
}
document.getElementById('openSpotify').onclick = function() {
    if (currentLinks.spotify) window.location.href = currentLinks.spotify;
};
document.getElementById('openApple').onclick = function() {
    if (currentLinks.apple) window.location.href = currentLinks.apple;
};
document.getElementById('openYouTube').onclick = function() {
    if (currentLinks.youtube) window.location.href = currentLinks.youtube;
};
document.getElementById('closeModal').onclick = closeModal;
function closeModal() {
    document.getElementById('musicModal').classList.remove('show');
    document.body.style.overflow = "";
    requestAnimationFrame(() => {
        window.scrollTo(0, scrollY + 1);
        requestAnimationFrame(() => {
            window.scrollTo(0, scrollY);
        });
    });
}
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('musicModal');
        if (modal && modal.classList.contains('show')) {
            closeModal();
        }
    }
});
document.getElementById('musicModal').addEventListener('click', function(e) {
    if (e.target.id === 'musicModal') {
        closeModal();
    }
});
window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;
    const navbar = document.getElementById('navbar');
    const scrollThreshold = 5;
    if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
    }
});
