// Zamana Hussain - Domain Management System
// JavaScript Logic for Domain Management

class DomainManager {
    constructor() {
        this.domains = this.loadDomains();
        this.initializeEventListeners();
        this.displayDomains();
    }

    // LocalStorage سے Domains لوڈ کریں
    loadDomains() {
        const saved = localStorage.getItem('domains');
        return saved ? JSON.parse(saved) : [];
    }

    // LocalStorage میں Domains محفوظ کریں
    saveDomains() {
        localStorage.setItem('domains', JSON.stringify(this.domains));
    }

    // Event Listeners سیٹ کریں
    initializeEventListeners() {
        const form = document.getElementById('domainForm');
        form.addEventListener('submit', (e) => this.addDomain(e));
    }

    // نیا Domain شامل کریں
    addDomain(e) {
        e.preventDefault();

        const domain = {
            id: Date.now(),
            name: document.getElementById('domainName').value,
            owner: document.getElementById('domainOwner').value,
            expiryDate: document.getElementById('expiryDate').value,
            status: document.getElementById('domainStatus').value,
            addedDate: new Date().toLocaleDateString('ur-PK')
        };

        this.domains.push(domain);
        this.saveDomains();
        this.displayDomains();
        
        // فارم صاف کریں
        document.getElementById('domainForm').reset();
        alert('✅ Domain کامیابی سے شامل ہو گیا!');
    }

    // تمام Domains کو ڈسپلے کریں
    displayDomains() {
        const container = document.getElementById('domainsList');
        
        if (this.domains.length === 0) {
            container.innerHTML = '<p class="empty-message">ابھی کوئی Domain شامل نہیں کیا گیا</p>';
            return;
        }

        container.innerHTML = this.domains.map(domain => `
            <div class="domain-card">
                <h3>🌐 ${domain.name}</h3>
                <div class="domain-info">
                    <strong>مالک:</strong> ${domain.owner}
                </div>
                <div class="domain-info">
                    <strong>Expiry تاریخ:</strong> ${this.formatDate(domain.expiryDate)}
                </div>
                <div class="domain-info">
                    <strong>شامل کی تاریخ:</strong> ${domain.addedDate}
                </div>
                <div class="domain-info">
                    <strong>باقی دن:</strong> ${this.getDaysRemaining(domain.expiryDate)} دن
                </div>
                <span class="status-badge status-${domain.status.toLowerCase()}">
                    ${this.getStatusInUrdu(domain.status)}
                </span>
                <button class="btn-delete" onclick="domainManager.deleteDomain(${domain.id})">
                    حذف کریں
                </button>
            </div>
        `).join('');
    }

    // Domain حذف کریں
    deleteDomain(id) {
        if (confirm('کیا آپ واقعی یہ Domain حذف کرنا چاہتے ہیں؟')) {
            this.domains = this.domains.filter(d => d.id !== id);
            this.saveDomains();
            this.displayDomains();
            alert('✅ Domain حذف ہو گیا!');
        }
    }

    // تاریخ کو فارمیٹ کریں
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ur-PK', options);
    }

    // باقی دن کا حساب لگائیں
    getDaysRemaining(expiryDate) {
        const expiry = new Date(expiryDate);
        const today = new Date();
        const diff = expiry - today;
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days > 0 ? days : 0;
    }

    // Status کو اردو میں دکھائیں
    getStatusInUrdu(status) {
        const statusMap = {
            'Active': '✅ فعال',
            'Inactive': '❌ غیر فعال',
            'Expiring': '⚠️ ختم ہو رہا'
        };
        return statusMap[status] || status;
    }
}

// صفحہ لوڈ ہونے پر Domain Manager شروع کریں
document.addEventListener('DOMContentLoaded', () => {
    window.domainManager = new DomainManager();
});

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DomainManager;
}
