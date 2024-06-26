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


























    var hijriMonthName;
    var hDmY_x, hDmY_y, hDmY_z; 
    function hDmY_formatDate(date) {
    var hDmY_day = date.getDate();
    var hDmY_month = date.getMonth() + 1;
    var hDmY_year = date.getFullYear();
    return (hDmY_day < 10 ? '0' : '') + hDmY_day + '-' + (hDmY_month < 10 ? '0' : '') + hDmY_month + '-' + hDmY_year;
    }
    var hDmY_today = new Date();
    var hDmY_formattedDate = hDmY_formatDate(hDmY_today);
    var hDmY_apiEndpoint = "https://api.aladhan.com/v1/gToH/" + hDmY_formattedDate;

fetch(hDmY_apiEndpoint)
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(data) {
        var hDmY_arabicDate = data.data.hijri.date;
        var hDmY_dateParts = hDmY_arabicDate.split('-');
        hDmY_x = (parseInt(hDmY_dateParts[0]) - 1).toLocaleString("bn-BD"); 
        hDmY_y = parseInt(hDmY_dateParts[1]);
        hDmY_z = parseInt(hDmY_dateParts[2]).toLocaleString("bn-BD").replace(/,/g, '');
        
        var hijriMonthNames = {
            1: "মহররম",
            2: "সফর",
            3: "রবিউল আউয়াল",
            4: "রবিউস সানি",
            5: "জুমাদাল উলা",
            6: "জুমাদাস সানি",
            7: "রজব",
            8: "শাবান",
            9: "রমজান",
            10: "শাওয়াল",
            11: "জিলকদ",
            12: "জিলহজ্জ"
        };
        
        hijriMonthName = hijriMonthNames[hDmY_y];
        
        document.getElementById("dateall").textContent = hDmY_x + " " + hijriMonthName + " " + hDmY_z + " হিজরি";

        hDmY_operations();
    })
    .catch(function(error) {
        console.error('There was a problem with the fetch operation:', error);
    });


    function hDmY_operations() {
    var hDmY_sss = hDmY_x + hDmY_y + hDmY_z + hijriMonthName + lalaDays;

// আপনি চাইলে রা, ঠা, ষ্ঠ, ম, য় ব্যবহার করতে পারেন
const cdWsesMap = {
    "১": "লা",
    "২": "রা",
    "৩": "রা",
    "৪": "ঠা",
    "৫": "ই",
    "৬": "ই",
    "৭": "ই",
    "৮": "ই",
    "৯": "ই",
    "১০": "ই",
    "১১": "ই",
    "১২": "ই",
    "১৩": "ই",
    "১৪": "ই",
    "১৫": "ই",
    "১৬": "ই",
    "১৭": "ই",
    "১৮": "ই",
    "১৯": "ই",
    "২০": "শে",
    "২১": "শে",
    "২২": "শে",
    "২৩": "শে",
    "২৪": "শে",
    "২৫": "শে",
    "২৬": "শে",
    "২৭": "শে",
    "২৮": "শে",
    "২৯": "শে",
    "৩০": "শে",
    "৩১": "শে"
};

var cdWses = cdWsesMap[currentBnDate];

    var qwes; // Declare qwes outside the if-else statements

if (currentBnMonth === "ফাল্গুন" || currentBnMonth === "চৈত্র") {
    qwes = "বসন্তকাল";
}
else if (currentBnMonth === "বৈশাখ" || currentBnMonth === "জ্যৈষ্ঠ") {
    qwes = "গ্রীষ্মকাল";
}
else if (currentBnMonth === "আষাঢ়" || currentBnMonth === "শ্রাবণ") {
    qwes = "বর্ষাকাল";
}
else if (currentBnMonth === "ভাদ্র" || currentBnMonth === "আশ্বিন") {
    qwes = "শরৎকাল";
}
else if (currentBnMonth === "কার্তিক" || currentBnMonth === "অগ্রহায়ন") {
    qwes = "হেমন্তকাল";
}
else if (currentBnMonth === "পৌষ" || currentBnMonth === "মাঘ") {
    qwes = "শীতকাল";
}

document.getElementById("dateall").innerHTML = "আজ " + lalaDays + " " + currentBnDate + cdWses + " " + currentBnMonth + " " + currentBnYear + " বঙ্গাব্দ, " + emNonts + " খ্রিষ্টাব্দ, " + hDmY_x + " " + hijriMonthName + " " + hDmY_z + " হিজরি, " + qwes;

var tNcQ_canvas = document.getElementById("canvas");
var tNcQ_ctx = tNcQ_canvas.getContext("2d");

var tNcQ_colors = ["#0637bf", "#058055", "#87091e", "#2c0980", "#05060a"];

function tNcQ_getRandomColor() {
    var tNcQ_randomIndex = Math.floor(Math.random() * tNcQ_colors.length);
    return tNcQ_colors[tNcQ_randomIndex];
}

var tNcQ_randomColor = tNcQ_getRandomColor();

var tNcQ_xc = "আজ " + lalaDays + " " + currentBnDate + cdWses + " " + currentBnMonth + " " + currentBnYear + " বঙ্গাব্দ,\n" + emNonts + " খ্রিষ্টাব্দ,\n" + hDmY_x + " " + hijriMonthName + " " + hDmY_z + " হিজরি,\n" + "" + qwes;

tNcQ_ctx.rect(0, 0, 600, 220);
tNcQ_ctx.fillStyle = tNcQ_randomColor;
tNcQ_ctx.fill();

tNcQ_ctx.font = "30px SolaimanLipi";
tNcQ_ctx.textAlign = "center";
tNcQ_ctx.fillStyle = "#FFF";

var lines = tNcQ_xc.split('\n');
lines.forEach(function(line, index) {
    tNcQ_ctx.fillText(line, 300, 60 + index * 40); // Adjust the Y position for each line
});


var tNcQ_dataUrl = tNcQ_canvas.toDataURL("image/webp");

document.getElementById("iamloki").src = tNcQ_dataUrl;
document.getElementById("iamloki").title = tNcQ_xc;
document.getElementById("iamloki").alt = tNcQ_xc;

document.getElementById("dTcaI").href = tNcQ_dataUrl;
document.getElementById("dTcaI").setAttribute("download", tNcQ_xc);
document.getElementById("dTcaI").title = tNcQ_xc;
document.getElementById("dTcaI").alt = tNcQ_xc;

var ajkerBanglaDate = currentBnDate;
var ajkerBanglaDay = lalaDays;
var ajkerBanglaYear = currentBnYear;
var ajkerBanglaMonth = currentBnMonth;
var ajkerBanglaRitu = qwes;


var ajkerEnglishDateFull =  emNonts;
// var ajkerEnglishYearFull = getEnFullYear;
var ajkerArabicDate = hDmY_x;
var ajkerArabicMonth = hijriMonthName;
var ajkerArabicYear = hDmY_z;


// Select all elements with the class name and update their text content
document.querySelectorAll(".ajkerBanglaDate").forEach(function(element) {
    element.textContent = ajkerBanglaDate;
});

document.querySelectorAll(".ajkerBanglaDay").forEach(function(element) {
    element.textContent = ajkerBanglaDay;
});

document.querySelectorAll(".ajkerBanglaYear").forEach(function(element) {
    element.textContent = ajkerBanglaYear;
});

document.querySelectorAll(".ajkerBanglaMonth").forEach(function(element) {
    element.textContent = ajkerBanglaMonth;
});

document.querySelectorAll(".ajkerBanglaRitu").forEach(function(element) {
    element.textContent = ajkerBanglaRitu;
});

document.querySelectorAll(".ajkerEnglishDateFull").forEach(function(element) {
    element.textContent = ajkerEnglishDateFull;
});

document.querySelectorAll(".ajkerArabicDate").forEach(function(element) {
    element.textContent = ajkerArabicDate;
});

document.querySelectorAll(".ajkerArabicMonth").forEach(function(element) {
    element.textContent = ajkerArabicMonth;
});

document.querySelectorAll(".ajkerArabicYear").forEach(function(element) {
    element.textContent = ajkerArabicYear;
});

document.querySelectorAll(".enDateInEnglish").forEach(function(element) {
    element.textContent = enDateInEnglish;
});

document.querySelectorAll(".enDayInEnglish").forEach(function(element) {
    element.textContent = enDayInEnglish;
});

document.querySelectorAll(".enMonthInEnglish").forEach(function(element) {
    element.textContent = enMonthInEnglish;
});

document.querySelectorAll(".enYearInEnglish").forEach(function(element) {
    element.textContent = enYearInEnglish;
});

document.querySelectorAll(".enDateInBangla").forEach(function(element) {
    element.textContent = enDateInBangla;
});

document.querySelectorAll(".enDayInBangla").forEach(function(element) {
    element.textContent = enDayInBangla;
});

document.querySelectorAll(".enMonthInBangla").forEach(function(element) {
    element.textContent = enMonthInBangla;
});

document.querySelectorAll(".enYearInBangla").forEach(function(element) {
    element.textContent = enYearInBangla;
});


var banglaKalText = document.querySelector('.ajkerBanglaRitu').textContent.trim().toLowerCase();
document.querySelectorAll('.season-name').forEach(function(seasonName) {
    var seasonNameText = seasonName.textContent.trim().toLowerCase();
    if (seasonNameText.includes(banglaKalText)) {
        seasonName.innerHTML += '<span class="currentbn-name text-sm text-red-600">(বর্তমান ঋতু)</span>';
    }
});
 };











document.addEventListener("DOMContentLoaded", async function() {
    var thaEv_noibText = new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit' });
    document.querySelector('.todaysEngDate').textContent = thaEv_noibText;
    try {
        const response = await fetch("/feeds/pages/default/4081438458534932846?alt=json");
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const thaEv_content = data.entry.content.$t;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = thaEv_content;
        const thaEv_dateMeElements = tempDiv.querySelectorAll('.todays-date');
        let thaEv_matchedDateContent = null;
        thaEv_dateMeElements.forEach(element => {
            if (element.textContent.trim() === thaEv_noibText) {
                thaEv_matchedDateContent = element.closest('.todays-all-events').innerHTML;
            }
        });
        // If matching content is found, display it
        if (thaEv_matchedDateContent) {
            document.getElementById('show_todays_events_and_holidays').innerHTML = thaEv_matchedDateContent;
        } else {
            // If no matching content found
            // console.error("Database not found or does not match conditions.");
        }
    } catch (error) {
        // Error handling
        // console.error("Error fetching data:", error);
    }
});























document.addEventListener('DOMContentLoaded', function() {
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const userIP = data.ip;
      fetch(`https://ipapi.co/${userIP}/json/`)
        .then(response => response.json())
        .then(data => {
          const userCountry = data.country_name;
          if (userCountry === "India") {
            document.getElementById("tab2").classList.add("active");
          } else {
            document.getElementById("tab1").classList.add("active");
          }
          updateActiveButton();
        });
    });


document.getElementById('countrySelect').addEventListener('change', function() {
  var tabId = this.value;
  document.querySelectorAll('.tabcontent').forEach(function(element) {
    element.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');
  updateActiveButton();
});

    
function updateActiveButton() {
  var activeTabId = document.querySelector('.tabcontent.active').id;
  document.getElementById('countrySelect').value = activeTabId;
};
});
