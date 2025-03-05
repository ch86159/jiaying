// dial.js
class DialService {
    constructor() {
      this.config = {
        debounceTime: 1000,
        wechatTip: '请点击右上角在浏览器中打开以拨号',
        lastClickTime: 0
      };
      
      this.init();
    }
  
    init() {
      this.bindEvents();
      this.addGlobalStyles();
    }
  
    bindEvents() {
      document.querySelectorAll('.dial-trigger').forEach(element => {
        element.addEventListener('click', this.handleClick.bind(this));
        element.addEventListener('touchend', this.handleClick.bind(this));
        
        // 添加交互效果
        element.addEventListener('mousedown', this.handlePress.bind(this));
        element.addEventListener('mouseup', this.handleRelease.bind(this));
        element.addEventListener('touchstart', this.handlePress.bind(this));
        element.addEventListener('touchend', this.handleRelease.bind(this));
      });
    }
  
    handleClick(e) {
      const now = Date.now();
      if (now - this.config.lastClickTime < this.config.debounceTime) return;
      this.config.lastClickTime = now;
  
      const phone = e.currentTarget.dataset.phone;
      if (!phone) {
        console.error('未配置电话号码');
        return;
      }
  
      if (confirm(`是否立即拨打：${phone}？`)) {
        this.dial(phone);
      }
    }
  
    dial(phone) {
      if (/MicroMessenger/i.test(navigator.userAgent)) {
        alert(this.config.wechatTip);
        return;
      }
  
      try {
        window.location.href = `tel:${phone}`;
        this.trackCall(phone);
      } catch (error) {
        alert(`拨号失败，请手动拨打：${phone}`);
        console.error('Dial error:', error);
      }
    }
  
    trackCall(phone) {
      // 这里可以添加统计代码
      console.log(`Dialed: ${phone}`);
    }
  
    // 交互效果
    handlePress(e) {
      e.currentTarget.style.transform = 'scale(0.97)';
      e.currentTarget.style.opacity = '0.8';
    }
  
    handleRelease(e) {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.opacity = '1';
    }
  
    addGlobalStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .dial-trigger {
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }
        
        .dial-trigger:active {
          transform: scale(0.98) !important;
          opacity: 0.7 !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    new DialService();
  });