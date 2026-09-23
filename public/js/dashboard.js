document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    const toggle = document.getElementById('menuToggle');
    const closeBtn = document.getElementById('sidebarClose');

    const openSidebar = () => {
        if (!sidebar || !backdrop) return;
        sidebar.classList.add('open');
        backdrop.classList.add('show');
    };

    const closeSidebar = () => {
        if (!sidebar || !backdrop) return;
        sidebar.classList.remove('open');
        backdrop.classList.remove('show');
    };

    if (toggle) toggle.addEventListener('click', openSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (backdrop) backdrop.addEventListener('click', closeSidebar);

    document.querySelectorAll('[data-page-link]').forEach((button) => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-page-link');
            if (!target) return;
            const link = `/dashboard/${target}`;
            window.location.href = link;
        });
    });

    document.querySelectorAll('form[data-confirm]').forEach((form) => {
        form.addEventListener('submit', (event) => {
            if (!window.confirm(form.dataset.confirm)) event.preventDefault();
        });
    });

    const mobileMore = document.getElementById('mobileMore');
    if (mobileMore) mobileMore.addEventListener('click', openSidebar);

    // Image drag & drop + preview for all CMS image fields.
    document.querySelectorAll('[data-image-dropzone]').forEach((dropzone) => {
        const input = dropzone.querySelector('[data-image-input]');
        const preview = dropzone.querySelector('[data-image-preview]');
        if (!input) return;

        const showPreview = (file) => {
            if (!file || !file.type.startsWith('image/')) return;
            const reader = new FileReader();
            reader.onload = () => {
                preview.src = reader.result;
                preview.classList.add('show');
            };
            reader.readAsDataURL(file);
        };

        // Ensure an existing image is visible when editing a record.
        if (preview && preview.getAttribute('src')) {
            preview.classList.add('show');
            preview.addEventListener('error', () => {
                preview.classList.remove('show');
            }, { once: true });
        }

        dropzone.addEventListener('click', (event) => {
            if (event.target !== input) input.click();
        });

        input.addEventListener('change', () => showPreview(input.files?.[0]));

        ['dragenter','dragover'].forEach(type => {
            dropzone.addEventListener(type, (event) => {
                event.preventDefault();
                dropzone.classList.add('dragging');
            });
        });

        ['dragleave','drop'].forEach(type => {
            dropzone.addEventListener(type, (event) => {
                event.preventDefault();
                dropzone.classList.remove('dragging');
            });
        });

        dropzone.addEventListener('drop', (event) => {
            const file = event.dataTransfer.files?.[0];
            if (!file) return;
            const transfer = new DataTransfer();
            transfer.items.add(file);
            input.files = transfer.files;
            showPreview(file);
        });
    });

    // Service title -> slug preview.
    const serviceTitle = document.querySelector('[data-service-title]');
    const serviceSlug = document.querySelector('[data-service-slug]');
    if (serviceTitle && serviceSlug) {
        const slugify = (value) => value
            .normalize('NFKD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        let slugTouched = false;
        serviceSlug.addEventListener('input', () => { slugTouched = true; });
        serviceTitle.addEventListener('input', () => {
            if (!slugTouched || !serviceSlug.value) serviceSlug.value = slugify(serviceTitle.value);
        });
    }

});
