var selectDate = new Array(); //存放选择的年月;
var lunarInfo=new Array(
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,          //1900-1909
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,  //1910-1919
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,  //1920-1929
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,  //1930-1939
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,  //1940-1949
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,  //1950-1959
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,  //1960-1969
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,  //1970-1979
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,  //1980-1989
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,  //1990-1999
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,  //2000-2009
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,  //2010-2019
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,  //2020-2029
0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,  //2030-2039
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0)  //2040-2049

var solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31);

var Gan=new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");

var Zhi=new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");

var Animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");

var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至")

var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758)

var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十')

var nStr2 = new Array('初','十','廿','卅','　')

var monthName = new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");

//计算农历一年的天数
function lYearDays(y) {

   var i, sum = 0;

   for(i=0x8000; i>0x8; i>>=1){
   	sum += (lunarInfo[y-1900] & i)? 30: 29;
   }

   return(sum+leapDays(y));
}

//计算农历 y年闰月的天数
function leapDays(y) {

   if(leapMonth(y))  
   	return((lunarInfo[y-1900] & 0x10000)? 30: 29);
   else 
   	return(0);
} 

//农历y年闰哪个月, 没闰传回 0
function leapMonth(y) {
   return(lunarInfo[y-1900] & 0xf);
}

//计算农历y年m月的天数
function monthDays(y,m) {
   return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
}


//计算农历日期
function Lunar(objDate) {

   var i, leap=0, temp=0;
   var baseDate = new Date(1900,0,31);
   var offset   = (objDate - baseDate)/86400000;  //计算相差天数

   this.dayCyl = offset + 40;
   this.monCyl = 14;

   //减去每年的天数，计算当前年月
   for(i=1900; i<2050 && offset>0; i++) {

      temp = lYearDays(i);
	  offset -= temp;
      this.monCyl += 12;
   }

   if(offset<0) {

      offset += temp;
	  i--;
	  this.monCyl -= 12;
   }

   this.year = i;
   this.yearCyl = i-1864;

   leap = leapMonth(i);  //闰哪个月
   this.isLeap = false;

   for(i=1; i<13 && offset>0; i++) {

      //闰月
      if(leap>0 && i==(leap+1) && this.isLeap==false){ 
      	--i; 
      	this.isLeap = true; 
      	temp = leapDays(this.year); 
      }

      else{ 
      	temp = monthDays(this.year, i); 
      }

      //解除闰月
      if(this.isLeap==true && i==(leap+1)) 
      	this.isLeap = false;

      offset -= temp;

      if(this.isLeap == false) 
      	this.monCyl ++;
   }

   if(offset==0 && leap>0 && i==leap+1)

      if(this.isLeap){ 
      	this.isLeap = false; 
      }
      else{ 
      	this.isLeap = true; 
      	--i; 
      	--this.monCyl;
      }

   if(offset<0){ 
   	offset += temp; 
   	--i; 
   	--this.monCyl; 
   }

   this.month = i;
   this.day = offset + 1;
}

//转换公历日期中文
function tDay(d){

   var day;

   switch (d) {
      case 10:
         day = '初十'; break;
      case 20:
         day = '二十'; break;
         break;
      case 30:
         day = '三十'; break;
         break;
      default :
         day = nStr2[Math.floor(d/10)];
         day += nStr1[d%10];
   }
   return(day);
} 

//计算公历y年某m+1月的天数
function solarDays(y,m) {

   if(m==1)
      return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
   else
      return(solarMonth[m]);
}


//获取公历和农历的日期参数,传递m+1的月，和date有关
function getCalendar(y, m){

   var dateArray = [];
   var sDdate, lDate; 
   var i=1, weekTemp, strTemp;

   var sMonth_Days = solarDays(y,m);
   var sLast_Month = solarDays(y,m-1); //上个月公历的天数

   sDdate = new Date(y, m, 1);
   this.firstWeek = sDdate.getDay();
   weekTemp = this.firstWeek? this.firstWeek:7; //计算万年历前面留白数

   //将显示日子的信息存入数组
   for( ; i < 36; i++){   //前部空白
      if(i < weekTemp){
         sDdate = new Date(y, m-1, sLast_Month - weekTemp + i + 1);
         lDate = new Lunar(sDdate);
         strTemp = sLast_Month - weekTemp + i + 1 + '-' + tDay(lDate.day);
         dateArray.push(strTemp);

         sDdate = null;
         strTemp = null;
      }
      else if(i < sMonth_Days + weekTemp){
         sDdate = new Date(y, m, i - weekTemp + 1);
         lDate = new Lunar(sDdate);
         strTemp = i - weekTemp + 1 + '-' + tDay(lDate.day);
         dateArray.push(strTemp);

         sDdate = null;
         strTemp = null;
      }
      else{  //后部空白
         sDdate = new Date(y, m+1, i - sMonth_Days - weekTemp + 1 );
         lDate = new Lunar(sDdate);
         strTemp = i - sMonth_Days - weekTemp + 1 + '-' + tDay(lDate.day);
         dateArray.push(strTemp);

         sDdate = null;
         strTemp = null;
      }
   }

   return dateArray;
}

//日期选择变化时触发
function selectChange(){

   var oYear = document.getElementById('year');
   var oMonth = document.getElementById('month');

   oYear.onchange = function(){   //年变化

      selectDate[0] = this.value;
      show(getCalendar(selectDate[0], selectDate[1]-1));
      console.log(selectDate);
   }

   oMonth.onchange = function(){   //月变化

      selectDate[1] = this.value;
      show(getCalendar(selectDate[0], selectDate[1]-1));
      console.log(selectDate);
   }
}

//下拉框初始化
function init(){
   var i, str_year='', str_month='';
   var oYear = document.getElementById('year');
   var oMonth = document.getElementById('month');
   var time = new Date();
   var currentYear, currentMonth;

   for( i = 1900; i < 2050 ; i++ ){
      str_year += "<option class='yearSelection' value="+i+">"+i+"</option>";
   }
   oYear.innerHTML = str_year;

   for(i = 1; i < 13; i++){
      str_month += "<option class='monthSelection' value="+i+">"+i+"</option>";
   }
   oMonth.innerHTML = str_month;

   var oYearOption = oYear.getElementsByTagName('option');
   var oMonthOption = oMonth.getElementsByTagName('option');

   currentYear = time.getFullYear();
   currentMonth = time.getMonth();

   oYearOption[currentYear-1900].selected = true;
   oMonthOption[currentMonth].selected = true;
   selectDate = [currentYear, currentMonth];
   show(getCalendar(selectDate[0], selectDate[1])); //不能直接调用show()，差一个月
}

//table显示
function show(monthData){

   console.log(monthData);
   
   var oTable = document.getElementById('#calendar'),
       oTr = document.getElementsByTagName('tr');
   var i, j, temp = '', temp_split='';
  
   for(i = 0; i < 5; i++ ){
      for( j = i*5 ; j < i*5 + 7; j++ ){
         temp_split = monthData[j];
         temp_split = temp_split.split('-');
         console.log(temp_split);
         temp += "<td><span class='solarDay'>"+temp_split[0]+"</span><br/><span class='lunarDay'>"+temp_split[1]+"</span></td>"
      }
         oTr[i+2].innerHTML = temp; 
         temp='';
   }


}

window.onload = function(){

   init();
   selectChange();
}