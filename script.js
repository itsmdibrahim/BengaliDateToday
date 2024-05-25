
   (() => {
  let t_bnYearDiff = 594;
  let t_countAgain = 0;
  let t_totalDatesAdded = 0;
  let t_totalActiveDatesAdded = 0;
  let t_dayIndex = 0;
  let t_reCountStarted = false;
  function formatBanglaNumber(number) {
    return number.toLocaleString("bn-BD").replace(/,/g, '');
  }
  function months(year) {
    const months = [
      {
        titleYear: year,
        titleBanYear: `${formatBanglaNumber(year - t_bnYearDiff)}`,
        title: "January",
        totalDays: 31,
        altBan: "মাঘ",
        altBanTotalDays: 30,
      },
      {
        titleYear: year,
        titleBanYear: `${formatBanglaNumber(year - t_bnYearDiff)}`,
        title: "February",
        totalDays: isLeapYear(year) ? 29 : 28,
        altBan: "ফাল্গুন",
        altBanTotalDays: isLeapYear(year) ? 30 : 29,
      },
      {
        titleYear: year,
        titleBanYear: `${formatBanglaNumber(year - t_bnYearDiff)}`,
        title: "March",
        totalDays: 31,
        altBan: "চৈত্র",
        altBanTotalDays: 30,
      },
      {
        titleYear: year,
        titleBanYear: `${formatBanglaNumber(year - t_bnYearDiff)}/${formatBanglaNumber(year - t_bnYearDiff + 1)}`,
        title: "April",
        totalDays: 30,
        altBan: "বৈশাখ",
        altBanTotalDays: 31,
      },
      {
        titleYear: year,
        titleBanYear: `${formatBanglaNumber(year - t_bnYearDiff + 1)}`,
        title: "May",
        totalDays: 31,
        altBan: "জ্যৈষ্ঠ",
        altBanTotalDays: 31,
      },
      {
        titleYear: year,
        titleBanYear: `${formatBanglaNumber(year - t_bnYearDiff + 1)}`,
        title: "June",
        totalDays: 30,
        altBan: "আষাঢ়",
        altBanTotalDays: 31,
      },
      {
        titleYear: year,
        titleBanYear: `${formatBanglaNumber(year - t_bnYearDiff + 1)}`,
        title: "July",
        totalDays: 31,
        altBan: "শ্রাবণ",
        altBanTotalDays: 31,
      },
      {
        titleYear: year,
        titleBanYear: `${formatBanglaNumber(year - t_bnYearDiff + 1)}`,
        title: "August",
        totalDays: 31,
        altBan: "ভাদ্র",
        altBanTotalDays: 31,
      },
      {
        titleYear: year,
        titleBanYear: `${formatBanglaNumber(year - t_bnYearDiff + 1)}`,
        title: "September",
        totalDays: 30,
        altBan: "আশ্বিন",
        altBanTotalDays: 30,
      },
      {
        titleYear: year,
        titleBanYear: `${formatBanglaNumber(year - t_bnYearDiff + 1)}`,
        title: "October",
        totalDays: 31,
        altBan: "কার্তিক",
        altBanTotalDays: 31,
      },
      {
        titleYear: year,
        titleBanYear: `${formatBanglaNumber(year - t_bnYearDiff + 1)}`,
        title: "November",
        totalDays: 30,
        altBan: "অগ্রহায়ণ",
        altBanTotalDays: 30,
      },
      {
        titleYear: year,
        titleBanYear: `${formatBanglaNumber(year - t_bnYearDiff + 1)}`,
        title: "December",
        totalDays: 31,
        altBan: "পৌষ",
        altBanTotalDays: 31,
      },
      {
        titleYear: year + 1,
        titleBanYear: `${formatBanglaNumber(year - t_bnYearDiff + 1)}`,
        title: "January",
        totalDays: 31,
        altBan: "মাঘ",
        altBanTotalDays: 30,
      },
      {
        titleYear: year + 1,
        titleBanYear: `${formatBanglaNumber(year - t_bnYearDiff + 1)}`,
        title: "February",
        totalDays: isLeapYear(year + 1) ? 29 : 28,
        altBan: "ফাল্গুন",
        altBanTotalDays: isLeapYear(year + 1) ? 30 : 29,
      },
      {
        titleYear: year + 1,
        titleBanYear: `${formatBanglaNumber(year - t_bnYearDiff + 1)}`,
        title: "March",
        totalDays: 31,
        altBan: "চৈত্র",
        altBanTotalDays: 30,
      },
    ];

    return { months };
  }
  let t_weeksGlobal = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let t_monthsGlobal = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const select = {
    one(sl) {
      return document.querySelector(sl);
    },
  };
  const database = [];
  let t_calenderDB = [];
  const components = {
    title(theMonth, month, i) {
      let html = `
       <div class="p-2 text-center text-xl font-semibold bg-[#374d6d] text-gray-50">
                <p>
                ${month.title}-${month.titleYear}-${
        getOrMonth(theMonth, i).altBan
      }/${month.altBan}-${month.titleBanYear}
                </p>
        </div>`;

      return html;
    },
    weeks() {
      let htmls = ``;

      for (let i = 0; i < t_weeksGlobal.length; i++) {
        const day = t_weeksGlobal[i];
        htmls += `
          <div class="p-2 border-r">
              <p class="text-center font-semibold text-gray-900">${day}</p>
          </div>
          `;
      }

      return htmls;
    },
    dates(year, theMonth, month, _i) {
      const dateBoxes = [];
      let html = ``;
      let indexDay = new Date(`${year}-01-01`).getDay();

      if (_i > 0) {
        totalDatesAdded = 0;

        for (let i = 0; i < t_dayIndex; i++) {
          totalDatesAdded++;

          let insideHtmls = ``;
          insideHtmls += ``;

          html += `
          <div class="border flex flex-col p-2 invisible">
              <p class="text-xl font-semibold text-gray-600"></p>

              <p class="self-end text-sm text-[#515962] flex items-center justify-between w-full">${insideHtmls}</p>
          </div>
          `;
        }
      } else {
        if (indexDay != 0) {
          totalDatesAdded = 0;

          for (let i = 0; i < indexDay; i++) {
            totalDatesAdded++;

            let insideHtmls = ``;
            insideHtmls += ``;

            html += `
          <div class="border flex flex-col p-2 invisible">
              <p class="text-xl font-semibold text-gray-600"></p>

              <p class="self-end text-sm text-[#515962] flex items-center justify-between w-full">${insideHtmls}</p>
          </div>
          `;
          }
        }
      }

      let banMonth = getOrMonth(theMonth, _i).altBan;

      for (let i = 0; i < month.totalDays; i++) {
        const day = i + 1;
        t_totalActiveDatesAdded++;
        totalDatesAdded++;

        t_dayIndex = totalDatesAdded % 7;

        let prevMonthTotalDays = getOrMonth(theMonth, _i).altBanTotalDays;

        let forBnMonth = (() => {
          if (_i > 3) {
            return t_reCountStarted
              ? (banMonth = month.altBan && month.altBan)
              : banMonth;
          } else {
            return day - 13 > 0
              ? month.altBan
              : getOrMonth(theMonth, _i).altBan;
          }
        })();

        let insideHtmls = ``;
        let forBnDateRef = null;
        function forBnDate() {
          if (_i > 3) {
            forBnDateRef = reCount();
          } else {
            forBnDateRef =
              day - 13 > 0
                ? reCount()
                : getOrMonth(theMonth, _i).altBanTotalDays + (day - 13);
          }

          return forBnDateRef;
        }

        if (_i > 2) {
          insideHtmls += `
                <span class="text-xs">${forBnMonth}</span>
                <span class="text-xs">${forBnDate().toLocaleString("bn-BD")}</span>
              `;
        } else {
          insideHtmls += `
                <span class="">n</span>
                <span>n</span>
              `;
        }

        html += `
        <div class="border flex flex-col p-2 ${
          month.title == t_monthsGlobal[new Date().getMonth()] &&
          day == new Date().getDate()
            ? `border activeDate`
            : ``
        }">
              <p class="text-xl font-semibold text-gray-600 text-center">${day}</p>

              <p class="self-end text-sm text-[#515962] flex items-center justify-between w-full">${insideHtmls}</p>
          </div>
        `;

        dateBoxes.push({
          day,
          forBnMonth,
          forBnDate: forBnDateRef,
        });

        t_reCountStarted = false;
        if (t_countAgain + 1 > prevMonthTotalDays) {
          t_countAgain = 0;
          t_reCountStarted = true;
        }
      }

      return { dateBoxes, html };
    },
  };

  function reCount() {
    t_countAgain++;

    return t_countAgain;
  }
  function getOrMonth(months, i) {
    return months[i == 0 ? months.length - 1 : i - 1];
  }
  function isLeapYear(year) {
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  function monthCard(year, theMonth, month, i) {
    const { dateBoxes, html: monthCardHtml } = components.dates(
      year,
      theMonth,
      month,
      i
    );

    let html = `
    <div class="bg-gray-50 p-2">
        <div>
            ${components.title(theMonth, month, i)}
        </div>
  
        <div class="grid gap-2 bg-gray-200 grid-cols-7">
            ${components.weeks()}
        </div>
  
        <div class="grid gap-0 grid-cols-7 p-0">
            ${monthCardHtml}
        </div>
    </div>
  `;

    database.push({
      dateBoxes,
      html,
      title: month.title,
      year,
      i: i + 1,
    });
  }
  function calender(thisYear) {
    resetControls();

    let theMonth = months(thisYear).months;
    theMonth.forEach((month, i) => {
      monthCard(thisYear, theMonth, month, i);
    });
  }
  function resetControls() {
    t_countAgain = 0;
    totalDatesAdded = 0;
    t_totalActiveDatesAdded = 0;
    t_dayIndex = 0;
  }
  function setCalender(thisYear) {
    calender(thisYear);
    calender(thisYear - 1);

    let thisYearsFirstPart = database
      .filter(
        (obj) =>
          obj.year == thisYear - 1 &&
          (obj.title == "January" ||
            obj.title == "February" ||
            obj.title == "March")
      )
      .sort((a, b) => b.i - a.i)
      .slice(0, 3)
      .sort((a, b) => a.i - b.i);

    let thisYearsLastPart = database
      .filter(
        (obj) =>
          obj.year == thisYear &&
          obj.title != "January" &&
          obj.title != "February" &&
          obj.title != "March"
      )
      .sort((a, b) => a.i - b.i);

    t_calenderDB = [...thisYearsFirstPart, ...thisYearsLastPart];
    //t_calenderDB = database;

    if (select.one("[data-show-eng-months]")) {
      t_calenderDB.forEach((obj) => {
        select.one("[data-show-eng-months]").innerHTML += obj.html;
      });
    }
  }
  function setCurrentMonthFromCalender() {
    let currentMonthHtml = t_calenderDB.filter(
      (obj) => obj.title == t_monthsGlobal[new Date().getMonth()]
    )[0].html;

    if (select.one("[data-current-eng-month]")) {
      select.one("[data-current-eng-month]").innerHTML = currentMonthHtml;
    }
  }

  setCalender(new Date().getFullYear());
  setCurrentMonthFromCalender();
})();





var emNonts;
    var currentMonthTitle; 
        var dateObject = new Date();       
        var dayOfWeek = dateObject.getDay();
        var banglaWeekdays = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
        var banglaMonths = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
        var banglaMonth = banglaMonths[dateObject.getMonth()];
        var output = dateObject.getDate().toLocaleString("bn-BD") + ' ' + banglaMonth + ' ' + dateObject.getFullYear().toLocaleString("bn-BD").replace(",", "") + ', ' + banglaWeekdays[dayOfWeek];
        var emNonts = dateObject.getDate().toLocaleString("bn-BD") + ' ' + banglaMonth + ' ' + dateObject.getFullYear().toLocaleString("bn-BD").replace(",", "");
        var englishWeekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var englishMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var englishMonth = englishMonths[dateObject.getMonth()];
        var enDateInEnglish = dateObject.getDate(); 
        var enDayInEnglish = englishWeekdays[dayOfWeek]; 
        var enMonthInEnglish = englishMonth; 
        var enYearInEnglish = dateObject.getFullYear(); 
        var enDateInBangla = dateObject.getDate().toLocaleString("bn-BD");
        var enDayInBangla = banglaWeekdays[dayOfWeek];
        var enMonthInBangla =  banglaMonth;
        var enYearInBangla = dateObject.getFullYear().toLocaleString("bn-BD").replace(",", "");
        document.querySelectorAll('.eD').forEach(function(element) {
          element.innerHTML = output;
        });
        var lalaDays = banglaWeekdays[dayOfWeek];
        var banglaYear = new Date().getFullYear() - 594;
        var banglaYearInBangla = banglaYear.toLocaleString("bn-BD").replace(/,/g, '');
        let currentBnDate;
        let currentBnMonth;
        let currentBnYear;
(() => {
  let currentMonthInfo = {};
  let bnYearDiff = 593;
  let countAgain = 0;
  let totalDatesAdded = 0;
  let dayIndex = 0;
  let weeksGlobal = [
    "রবি",
    "সোম",
    "মঙ্গল",
    "বুধ",
    "বৃহঃ",
    "শুক্র",
    "শনি",
    "রবি",
    "সোম",
    "মঙ্গল",
    "বুধ",
    "বৃহঃ",
    "শুক্র",
  ];
  const engMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const select = {
    one(sl) {
      return document.querySelector(sl);
    },
  };
  const database = [];
  const components = {
    title(month, i, thisYearInfo) {
      let orMonth =
        thisYearInfo.months[thisYearInfo.months.length == i + 1 ? 0 : i + 1];

      return `
          <div class="p-2 text-center text-xl font-semibold bg-[#374d6d] text-gray-50">
              <p>${month.title}-${(thisYearInfo.year - bnYearDiff).toLocaleString("bn-BD").replace(/,/g, '')} - ${
        month.altEng
      }/${orMonth.altEng} ${
        month.altEng == "December"
          ? `- ${thisYearInfo.year}-${thisYearInfo.year + 1}`
          : month.altEng == "January" ||
            month.altEng == "February" ||
            month.altEng == "March"
          ? `- ${thisYearInfo.year + 1}`
          : `- ${thisYearInfo.year}`
      }</p>
          </div>
          `;
    },
    weeks() {
      let days = setWeeks();
      let htmls = ``;

      for (let i = 0; i < days.length; i++) {
        const day = days[i];
        htmls += `
          <div class="p-2 border-r">
              <p class="text-center font-semibold text-gray-900">${day.title}</p>
          </div>
          `;
      }

      return htmls;
    },
    dates(month, _i, thisYearInfo) {
      let indexDay = new Date(`${thisYearInfo.year}-04-14`).getDay();



      //if (indexDay != 0) {
       // console.log(indexDay);
     // } else {
       // console.log(indexDay);
     // }


      let orMonth =
        thisYearInfo.months[thisYearInfo.months.length == _i + 1 ? 0 : _i + 1];
      let htmls = ``;
      const dateBoxes = [];

      if (_i > 0) {
        totalDatesAdded = 0;

        for (let i = 0; i < dayIndex; i++) {
          totalDatesAdded++;

          let insideHtmls = ``;
          insideHtmls += ``;

          htmls += `
          <div class="border flex flex-col p-2 invisible">
              <p class="text-xl font-semibold text-gray-600"></p>

              <p class="self-end text-sm text-[#515962] flex items-center justify-between w-full">${insideHtmls}</p>
          </div>
          `;
        }
      } else {
        if (indexDay != 0) {
          totalDatesAdded = 0;

          for (let i = 0; i < indexDay; i++) {
            totalDatesAdded++;

            let insideHtmls = ``;
            insideHtmls += ``;

            htmls += `
          <div class="border flex flex-col p-2 invisible">
              <p class="text-xl font-semibold text-gray-600"></p>

              <p class="self-end text-sm text-[#515962] flex items-center justify-between w-full">${insideHtmls}</p>
          </div>
          `;
          }
        }
      }

      for (let i = 0; i < month.totalDays; i++) {
        totalDatesAdded++;

        dayIndex = totalDatesAdded % 7;

        let forEnDate =
          i + 14 > month.altEngTotalDays
            ? reCount()
            : _i > 0
            ? reCount()
            : i + 14;

        let forEnMonth = i + 14 > forEnDate ? orMonth.altEng : month.altEng;

        let insideHtmls = ``;
        insideHtmls += `
                <span class="engMonths text-xs">${forEnMonth.slice(0, 3)}</span>
                <span class="engDates text-xs">${forEnDate}</span>
              `;

        htmls += `
          <div class="border flex flex-col p-2 datecontainer">
              <p class="text-lg font-semibold text-gray-600 text-center">${
                (i + 1).toLocaleString("bn-BD")
              }</p>

              <p class="self-end text-xs text-[#515962] flex items-center justify-between w-full">${insideHtmls}</p>
          </div>
          `;

        dateBoxes.push({
          bnDate: i + 1,
          engMonth: forEnMonth,
          engMonthSliced: forEnMonth.slice(0, 3),
          engDate: forEnDate,
        });

        if (countAgain + 1 > month.altEngTotalDays) {
          countAgain = 0;
        }
      }

      return { htmls, dateBoxes };
    },
  };
  const thisYearInfo = getMonths(new Date().getFullYear());
  const currentMonth = thisYearInfo.months.filter(
    (month) => month.altEng == engMonths[new Date().getMonth()]
  )[0];
  function getMonths(year) {
    const months = [
      { title: "বৈশাখ", totalDays: 31, altEng: "April", altEngTotalDays: 30 },
      { title: "জ্যৈষ্ঠ", totalDays: 31, altEng: "May", altEngTotalDays: 31 },
      { title: "আষাঢ়", totalDays: 31, altEng: "June", altEngTotalDays: 30 },
      { title: "শ্রাবণ", totalDays: 31, altEng: "July", altEngTotalDays: 31 },
      {
        title: "ভাদ্র",
        totalDays: 31,
        altEng: "August",
        altEngTotalDays: 31,
      },
      {
        title: "আশ্বিন",
        totalDays: 31,
        altEng: "September",
        altEngTotalDays: 30,
      },
      {
        title: "কার্তিক",
        totalDays: 30,
        altEng: "October",
        altEngTotalDays: 31,
      },
      {
        title: "অগ্রহায়ণ",
        totalDays: 30,
        altEng: "November",
        altEngTotalDays: 30,
      },
      {
        title: "পৌষ",
        totalDays: 30,
        altEng: "December",
        altEngTotalDays: 31,
      },
      { title: "মাঘ", totalDays: 30, altEng: "January", altEngTotalDays: 31 },
      {
        title: "ফাল্গুন",
        totalDays: isLeapYear(year + 1) ? 30 : 29,
        altEng: "February",
        altEngTotalDays: isLeapYear(year + 1) ? 29 : 28,
      },
      { title: "চৈত্র", totalDays: 30, altEng: "March", altEngTotalDays: 31 },
    ];
    return { year, months };
  }
  function currentMonthFunctionalities() {
    resetControls();

    const thisYearInfo = getMonths(new Date().getFullYear());
    thisYearInfo.months.forEach((month, i) => {
      const card = calenderTemp(month, i, thisYearInfo);
      const showMonthsElement = select.one("[data-show-months]");
      showMonthsElement && (showMonthsElement.innerHTML += card.html);
      month.altEng == "December";
      month.altEng == "January" ||
      month.altEng == "February" ||
      month.altEng == "March"
        ? database.push({
            altEng: month.altEng,
            calenderTemp: card.html,
            dateBox: card.dateBox,
            year: thisYearInfo.year + 1,
            title: month.title,
          })
        : database.push({
            altEng: month.altEng,
            calenderTemp: card.html,
            dateBox: card.dateBox,
            year: thisYearInfo.year,
            title: month.title,
          });
    });

    let dbObj = database
      .reduce((arr, itm) => {
        itm.dateBox.forEach((itm2) =>
          arr.push({ ...itm2, year: itm.year, calenderTemp: itm.calenderTemp })
        );
        return arr;
      }, [])
      .filter(
        (itm) =>
          itm.engDate == new Date().getDate() &&
          itm.engMonth == engMonths[new Date().getMonth()]
      )[0];
    currentMonthInfo.bnMonth = dbObj.title;
    currentMonthInfo.bnYear = thisYearInfo.year - bnYearDiff;

    const currentMonthElement = select.one("[data-current-ban-month]");
    currentMonthElement && (currentMonthElement.innerHTML = dbObj.calenderTemp);
  }
  function isLeapYear(year) {
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  function calenderTemp(month, i, thisYearInfo) {
    const dates = components.dates(month, i, thisYearInfo);

    return {
      html: `
  <div class="bg-gray-50 p-2">
      <div>
          ${components.title(month, i, thisYearInfo)}
      </div>

      <div class="grid gap-2 bg-gray-200 grid-cols-7">
          ${components.weeks()}
      </div>

      <div class="grid gap-0 grid-cols-7 p-0">
          ${dates.htmls}
      </div>
  </div>
`,
      dateBox: dates.dateBoxes,
    };
  }
  function showToday() {
    let today = database
      .reduce((arr, itm) => {
        itm.dateBox.forEach((itm2) =>
          arr.push({
            ...itm2,
            title: itm.title,
            year: itm.year,
            calenderTemp: itm.calenderTemp,
          })
        );
        return arr;
      }, [])
      .filter(
        (itm) =>
          itm.engDate == new Date().getDate() &&
          itm.engMonth == engMonths[new Date().getMonth()]
      )[0];


    currentMonthInfo.bnDate = today.bnDate;
    currentMonthInfo.bnMonth = today.title;


    currentBnDate = currentMonthInfo.bnDate.toLocaleString("bn-BD");
    currentBnMonth = currentMonthInfo.bnMonth;
    currentBnYear = currentMonthInfo.bnYear.toLocaleString("bn-BD").replace(/,/g, '');

    const currentBnDateElement = select.one("[data-current-ban-date]");


    currentBnDateElement &&
      (currentBnDateElement.innerHTML = `
      <div class="border flex flex-col p-2 w-fit">
          <p class="text-base font-semibold text-gray-600 text-center">${today.bnDate}</p>

          <p class="self-end text-sm font-semibold text-[#515962] flex gap-8 items-center justify-between w-full">
              <span class="engMonths">${today.engMonthSliced}</span>
              <span class="engDates">${today.engDate}</span>
          </p>
      </div>
    `);
  }
  function reCount() {
    countAgain++;
    return countAgain;
  }
  function resetControls() {
    countAgain = 0;
    totalDatesAdded = 0;
    dayIndex = 0;
  }
  function setWeeks() {
    let maxPush = 0;
    //let indexDay = new Date(`${year}-04-14`).getDay();
    let indexDay = 0;

    let weekDays = [];

    for (let i = indexDay; i < weeksGlobal.length; i++) {
      if (maxPush < 7) {
        maxPush++;

        const el = weeksGlobal[i];
        weekDays.push({ title: el });
      } else {
        break;
      }
    }

    return weekDays;
  }
  currentMonthFunctionalities();
  showToday();
})();

        
      const qx_engMonths = document.querySelectorAll(".engMonths");
        const qx_engDates = document.querySelectorAll(".engDates");
        const qx_dateContainers = document.querySelectorAll(".datecontainer");
    
        const qx_today = new Date();
        const qx_currentMonthFull = qx_today.toLocaleString('default', { month: 'long' });
        const qx_currentMonth = qx_currentMonthFull.slice(0, 3);
        const qx_currentDate = qx_today.getDate();
    
        for (let i = 0; i < qx_engMonths.length; i++) {
            const qx_monthName = qx_engMonths[i].textContent.trim();
            const qx_date = parseInt(qx_engDates[i].textContent.trim());
    
            if (qx_monthName === qx_currentMonth && qx_date === qx_currentDate) {
                qx_dateContainers[i].classList.add("activeDate");
            }
        };




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
