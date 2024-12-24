
$(function () {
    // 初始化頁面內容
    initNavbar();  //渲染navbar
    initFooter();  //渲染footer
    handleUserState(); //判斷使用者是否登入
});

// 渲染navbar
function initNavbar() {
    // 從 localStorage 獲取當前用戶
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    const user_name = loggedInUser && loggedInUser.phone ? loggedInUser.phone : "訪客";

    // 動態生成導航欄內容
    $("#fenghua_nav").html(`
        <nav class="navbar navbar-expand-md shadow navbar-dark">
            <div class="container">
                <a class="navbar-brand" href="index.html"><img src="./image/food/logo_yoko.png" width="120px" alt=""></a>
                <ul class="navbar-nav me-auto">
                    <li class="nav-item d-none dropdown" id="user_name_area">
                        <button class="bg-btn-navbar" id="navbarLogDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <a class="nav-link fs-5 dropdown-toggle" href="#">${user_name}，您好</a>
                        </button>
                        <ul class="dropdown-menu text-center" aria-labelledby="navbarLogDropdown">
                            <li><a class="dropdown-item fs-5" href="orderList.html">查看訂單</a></li>
                            <li><a class="dropdown-item fs-5" href="ReservedHistory.html">查看預約紀錄</a></li>
                        </ul>
                    </li>
                </ul>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-md-auto text-center">
                        <li class="nav-item dropdown">
                            <button class="bg-btn-navbar" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <a class="nav-link dropdown-toggle fs-5" href="#">精選菜單</a>
                            </button>
                            <ul class="dropdown-menu text-center" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item fs-5" href="product.html">鳳華美食</a></li>
                                <li><a class="dropdown-item fs-5" href="product.html">精選套組</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <button class="bg-btn-navbar" onclick="location.href='about.html'">
                                <a class="nav-link fs-5" href="./about.html" target="_blank">關於我們</a>
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="bg-btn-navbar" onclick="location.href='Reserved.html'">
                                <a class="nav-link fs-5" href="#">我要訂位</a>
                            </button>
                        </li>
                        <li class="nav-item" id="login_button">
                            <button class="bg-btn-navbar" onclick="location.href='login.html'">
                                <a class="nav-link fs-5"><i class="fa-solid fa-user fs-5"></i>登入/註冊</a>
                            </button>
                        </li>
                        <li class="nav-item d-none" id="logout_button">
                            <button class="bg-btn-navbar">
                                <a class="nav-link fs-5"><i class="fa-solid fa-right-from-bracket fs-5"></i>登出</a>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `);

    // 綁定登出按鈕事件
    $("#logout_button").on("click", handleLogout);
}

// 渲染footer
function initFooter() {
    const currentYear = new Date().getFullYear();

    $(".back_to_top").html(
        `
            <div class="top">
                <i class="fa-solid fa-arrow-up text-white"></i>
            </div>
        `
    )
    // 生成頁尾資訊
    $(".info_area").html(`
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-4 text-center">
                    <a class="navbar-brand" href="index.html"><img src="./image/food/logo_yoko.png" width="200px" alt=""></a>
                </div>
                <div class="col-md-4 text-center text-white mt-2">
                    <p><span class="text-title">地址</span> 鳳山市鳳水區鳳翔路88號88樓</p>
                    <p><span class="text-title">訂位專線</span> 0800-1234-5678</p>
                    <p><span class="text-title">Email</span> info@fenghualou.com</p>
                </div>
                <div class="col-md-4 text-center">
                    <a href="#" class="text-decoration-none"><i class="fa-brands fa-facebook text-white p-3"></i></a>
                    <a href="#" class="text-decoration-none"><i class="fa-brands fa-instagram text-white p-3"></i></a>
                    <a href="#" class="text-decoration-none"><i class="fa-solid fa-envelope text-white p-3"></i></a>
                    <a href="#" class="text-decoration-none"><i class="fa-brands fa-line text-white p-3"></i></a>
                </div>
            </div>
        </div>
    `);

    $(".Copyright_area").html(`
        <div class="container">
            <div class="row">
                <div class="col-12 text-white text-center">
                    <p style="color: #C5C4C1;">Copyright © 鳳華樓 ${currentYear}. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    `);
}

// 判斷使用者是否登入
function handleUserState() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

    if (loggedInUser) {
        $("#login_button").addClass("d-none");
        $("#logout_button").removeClass("d-none");
        $("#user_name_area").removeClass("d-none");
    } else {
        $("#login_button").removeClass("d-none");
        $("#logout_button").addClass("d-none");
        $("#user_name_area").addClass("d-none");
    }
}

// 登出按鈕
function handleLogout() {
    try {
        localStorage.removeItem("loggedInUser");
        Swal.fire({
            title: "登出成功",
            text: "您已成功登出。",
            icon: "success",
        }).then(() => {
            location.reload(); // 重新載入頁面
        });
    } catch (error) {
        Swal.fire({
            title: "登出失敗",
            text: "無法清除本地資料，請檢查您的瀏覽器設置。",
            icon: "error",
        });
        console.error("登出失敗:", error);
    }
}
