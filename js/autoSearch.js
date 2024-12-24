const reservationsContainer = $("#reservations");


// 搜尋預訂數據的函式
function searchReservationByPhone(phone) {
    // 從 localStorage 中獲取所有預訂數據
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    
    // 根據 phone 搜尋符合的預訂
    const result = reservations.filter(reservation => reservation.phone === phone);
    
    return result;
}

// 顯示搜尋結果的函式
function showSearchResult(searchResult) {
    reservationsContainer.empty();
    if (searchResult.length > 0) {        
        // 遍歷所有預訂
        searchResult.forEach((reservation, index) => {
            const reservationDiv = $(`
                <div class="reservation" data-index="${index}" data-phone="${reservation.phone}">
                    <div class="row">
                        <div class="col-6 text-start">
                            <em class="h4 text-text">預約編號 ${reservation.phone}-${index + 1} </em>    
                        </div>
                        <div class="col-6 text-end">
                            <h5 class="text-order">預約狀態:<em class="h5 text-white">準備中</em></h5>
                        </div>
                    </div>
                    <div class="reservation-details mt-3">
                        <p class="h5 text-order">姓名: ${reservation.name}</p>
                        <p class="h5 text-order">電話: ${reservation.phone}</p>
                        <p class="h5 text-order">預訂日期: ${reservation.reservationDate}</p>
                        <p class="h5 text-order">預訂時間: ${reservation.reservationTime}</p>
                        <p class="h5 text-order">人數: ${reservation.partySize}</p>
                    </div>
                    <div class="text-end mt-3">
                        <button class="btn btn_cart text-white cancel-reservation-btn d-none">取消預訂</button>    
                    </div>
                </div>
            `);

            // 監聽取消預訂按鈕的點擊事件
            reservationDiv.find(".cancel-reservation-btn").on("click", function () {
                const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

                // 如果當前預訂的電話與登入用戶的電話不一致，則不允許刪除
                if (loggedInUser && loggedInUser.phone !== reservation.phone) {
                    Swal.fire({
                        title: '錯誤',
                        text: '您無法取消其他人的預訂。',
                        icon: 'error',
                        confirmButtonText: '確認',
                    });
                    return; // 不執行刪除操作
                }

                Swal.fire({
                    title: '確定取消預訂嗎?',
                    text: "取消後將無法恢復該預訂。",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '確認取消',
                    cancelButtonText: '取消',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // 從 localStorage 中獲取所有預訂數據
                        const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

                        // 刪除指定的預訂
                        const updatedReservations = reservations.filter(r => 
                            r.phone !== reservation.phone || 
                            r.reservationDate !== reservation.reservationDate || 
                            r.reservationTime !== reservation.reservationTime
                        );

                        // 更新 localStorage
                        localStorage.setItem('reservations', JSON.stringify(updatedReservations));

                        // 重新加載頁面以顯示更新後的預訂
                        location.reload();  // 重新加載頁面以顯示更新後的預訂
                    }
                });
            });

            // 添加預訂到容器
            reservationsContainer.append(reservationDiv);
        });
    } else {
        reservationsContainer.html("<p>您尚未有任何預訂紀錄。</p>");
    }
}

// 自動搜尋目前登入用戶的預訂數據
function autoSearchReservation() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || !loggedInUser.phone) {
        return;
    }

    const userPhone = loggedInUser.phone;
    const searchResult = searchReservationByPhone(userPhone);

    showSearchResult(searchResult);
}

// 搜尋按鈕事件綁定
function searchButton() {
    $('#searchButton').on('click', function () {
        const phoneToSearch = $('#phoneInput').val(); // 獲取輸入的電話號碼
        const searchResult = searchReservationByPhone(phoneToSearch);
        showSearchResult(searchResult);
    });
}

// 根據是否登入生成搜尋框
function handleUserState_preorder_history() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    searchArea=
    `
            <div class="col-12">
                <label for="phoneInput" class="h2">搜尋預約紀錄</label>
                <input type="phone" class="form-control w-25 " name="" id="phoneInput" placeholder="請輸入你的手機號碼">
            </div>
            <div class="col-12">
                <button class="btn btn_cart my-3" id="searchButton">搜尋</button>
            </div>
    `;
    if (loggedInUser) {
        $(".cancel-reservation-btn").removeClass("d-none");
    } else {
        $(".cancel-reservation-btn").addClass("d-none");
        $("#searchArea").html(searchArea);
    }
}

// 測試：頁面加載後自動搜尋
$(document).ready(function () {
    autoSearchReservation();
    searchButton(); // 綁定搜尋按鈕
    handleUserState_preorder_history();
});
