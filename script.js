var scT_bgImage = '';
var scT_currentDate = new Date();
var scT_month = scT_currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
if ((scT_month == 4 && scT_currentDate.getDate() >= 14) || (scT_month > 4 && scT_month < 6) || (scT_month == 6 && scT_currentDate.getDate() <= 14)) {
    scT_bgImage = 'url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjyuGOgxRrhnOj7lsomE9JnpBSMvGCoq29VL87jZeCSvifUCV-ruXW1iF-TrGsJsUwXkvx77WfoumfZzM_SHVezNGGEOuvmCbHsi3T4sE2WkHd_OliQFpBMma7elkS0VMgAF93L15_np4doRCRii_vl-AOugRyTVmWlbcerq1h0abrJeSt8p8SVYm0_GVug/s1600-rw/summer.jpg)';
} else if ((scT_month == 6 && scT_currentDate.getDate() >= 15) || (scT_month > 6 && scT_month < 8) || (scT_month == 8 && scT_currentDate.getDate() <= 15)) {
    scT_bgImage = 'url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSMTzXDDHT4qQZwwI_FWKpBc9KGyw-4fzLL4gsbJ2WTDbDO4dDiHXfWL1iWdtT2qh1j_LU2coAg5kNJQZ3oDal0MSq04ZMrTWwelKP_Y_vUzs9EXq2e-ahg_MCjIbyNSTTLYPRbl2Kq8gPf12GleWU3qq65U8IUNTCDA2uJ8HOgWczpgX6utqPa8LGw-24/s600-rw/monsoon.jpg)';
} else if ((scT_month == 8 && scT_currentDate.getDate() >= 16) || (scT_month > 8 && scT_month < 10) || (scT_month == 10 && scT_currentDate.getDate() <= 15)) {
    scT_bgImage = 'url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEinBcmhAw6U_zXEv8wgnGPnYrO3tNKN1VLGMIrhfD-tks-OoW3adOFghGnzdm3Nra0q4hgWHR_fc34_Pe7c1u4-xYVxa1tt19YRgWM1JYhssQ0MgAnU_BgVb95pda9N2kCA7wls4dwYl1fdNDynUGKwiFd87JIAL5W02tF_zdKWGLHXcuSmVRw-V7MCKPuS/s600-rw/sorotkal.jpg)';
} else if ((scT_month == 10 && scT_currentDate.getDate() >= 16) || (scT_month > 10 && scT_month < 12) || (scT_month == 12 && scT_currentDate.getDate() <= 15)) {
    scT_bgImage = 'url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiYLwIDoTLDPV9bq9Gnz6Vj1psnaJf6lGibBzpOTkdPLnPB7U23VOYhSXVKVtGm2n56iT1hpCPj1U3ImqOv4_Az27qGbZEtmsi94jj1fhMRMDqsw5zgoPkWAj2eGG1-q_ff7dmI43sfzOB7J6ZpfzG_r4hyphenhyphen-2JOtsCFsRluFn0T5IPeMOkaWT8rorU1XbBy/s800/lateautum02.jpg)';
} else if ((scT_month == 12 && scT_currentDate.getDate() >= 16) || (scT_month == 1) || (scT_month == 2 && scT_currentDate.getDate() <= 13)) {
    scT_bgImage = 'url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhAfkThDix3NEcJQ6m6-6TIE6vFbmzJn2FUeEbh1GqbFd1UunlN4SULtZxZQoE-xMe4TxWSj1EGwqQKZicF6fMIw4urTxwlsNQmbD9zrE2vTYiBA4yeP7sI8P1zk9cr0z09b0Tp-sUz3cwwRYmnQ1cMu4Sz763Nvb04yJYB1okq9MH5i0Z_5xuSaeTfcHM5/s1600-rw/winter.jpg)';
} else {
    // Default value if none of the conditions are met
    scT_bgImage = 'url(https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEif8UXKfE1J3SxX1GVZKnsnFcjMt4ajVMvXQSKYEkPixYCRWE-mUziJrinrb0dNJoxEua_UFW7uWrmm8HgoithZH4hjHTt9NoHLLId6-g49j4F-8oYc791I0CnhANiWxNi3wygzDXbnvdPZmXEdJ7r25XaUrghxTK4C22u-6CXf6HueveER971RUOKWOfyR/s1600-rw/spring.jpg)';
}
document.querySelector('footer.tnT_Footer').style.backgroundImage = 'linear-gradient(rgb(0 0 0 / 63%), rgb(30 30 30 / 56%)), ' + scT_bgImage;

document.querySelectorAll('.opnmenu').forEach(function(element) {
  element.addEventListener('click', function() {
    document.querySelectorAll('.proxy, .proxytwo, .realmenu, .maincontent').forEach(function(item) {
      item.classList.add('brick');
    });
    document.body.classList.add('bodyNoscroll');
  });
});
document.querySelectorAll('.closemenu').forEach(function(element) {
  element.addEventListener('click', function() {
    document.querySelectorAll('.proxy, .proxytwo, .realmenu, .maincontent').forEach(function(item) {
      item.classList.remove('brick');
    });
    document.body.classList.remove('bodyNoscroll');
  });
});
document.querySelectorAll('.comments .avatar-image-container img').forEach(function(img) {
  if (img.getAttribute('src') === '//resources.blogblog.com/img/blank.gif') {
    img.setAttribute('src', 'https://4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s39/avatar.jpg');
  }
}); 
