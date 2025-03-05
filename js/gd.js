// main.js
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const whiteBox1 = document.getElementById("contentBox");
    const downLoadBtn1 = document.getElementById("downBtn");
    const innerContent = document.getElementsByClassName("innerContet")[0];
    const versionCont = document.getElementsByClassName("versionCont")[0];

    if (scrollTop <= 40) {
        whiteBox1.className = 'whiteBox';
        downLoadBtn1.className = 'downLoadBtn';
        innerContent.className = 'innerContet';
        versionCont.className = 'versionCont';
    } else {
        whiteBox1.className = 'onTop';
        downLoadBtn1.className = 'downLoadBtnOnTop';
        innerContent.classList.add('hide');
        versionCont.classList.add('hide');
    }
}

function downLoad() {
    const u = navigator.userAgent;
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    // 统一跳转地址示例，请替换实际URL
    const downloadURL = 'https://candid-platypus-81b654.netlify.app/';
    window.location.href = downloadURL;
}

// 初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', handleScroll, true);
    
    // 如果按钮是动态生成的，改用事件委托
    const downloadBtn = document.getElementById("downBtn");
    if(downloadBtn) {
        downloadBtn.addEventListener('click', downLoad);
    }
});