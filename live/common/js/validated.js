function testNameEvent(obj, rules, i, options) {
    var v = obj.val();
    var m = new RegExp(/^(([\u4E00-\u9FA5]|[a-zA-Z])+)$/gi);
    var a = true;
    if (v == "") {
        a = false;
    } else {
        if (!m.test(v)) {
            a = "* 请输入正确的姓名";
        }
    }
    return a;
}

function valiIdCard(field, rules, i, options) {
  var idCard = field.val();
  var checkFlag = new IDCard(idCard);
  if(idCard.length<18){
    return '* 您输入的身份证号码不正确';
  }
  if (!checkFlag.IsValid()) {
    return '* 您输入的身份证号码不正确';
  } 
}

function IDCard(CardNo) {
  this.Valid=false;
  this.ID15='';
  this.ID18='';
  this.Local='';
  if(CardNo!=null)this.SetCardNo(CardNo);
}

// 设置身份证号码，15位或者18位
IDCard.prototype.SetCardNo = function(CardNo) {
  this.ID15='';
  this.ID18='';
  this.Local='';
  CardNo=CardNo.replace(" ","");
  var strCardNo;
  if(CardNo.length==18) {
    pattern= /^\d{17}(\d|x|X)$/;
    if (pattern.exec(CardNo)==null)return;
    strCardNo=CardNo.toUpperCase();
  } else {
    pattern= /^\d{15}$/;
    if (pattern.exec(CardNo)==null)return;
    strCardNo=CardNo.substr(0,6)+'19'+CardNo.substr(6,9)
    strCardNo+=this.GetVCode(strCardNo);
  }
  this.Valid=this.CheckValid(strCardNo);
}

function getbirthday(code){
  var date = code.substring(6, 10) + "-" + code.substring(10, 12) + "-" + code.substring(12, 14);
  return date;
}

function getage(code){
  var myDate = new Date();
  var month = myDate.getMonth() + 1;
  var day = myDate.getDate();
  var age = myDate.getFullYear() - code.substring(6, 10) - 1;
  if (code.substring(10, 12) < month || code.substring(10, 12) == month && code.substring(12, 14) <= day) {
  age++;
  } 
  return age;
}
function Getsex(code){
  var gender = '';
  if (parseInt(code.substr(16, 1)) % 2 == 1) {
    gender = 'M';
  } else {
    gender = 'F';
  }
  return gender;
}


// 校验身份证有效性
IDCard.prototype.IsValid = function() {
  return this.Valid;
}

// 返回生日字符串，格式如下，1981-10-10
IDCard.prototype.GetBirthDate = function() {
  var BirthDate='';
  if(this.Valid)BirthDate=this.GetBirthYear()+'-'+this.GetBirthMonth()+'-'+this.GetBirthDay();
  return BirthDate;
}

// 返回生日中的年，格式如下，1981
IDCard.prototype.GetBirthYear = function() {
  var BirthYear='';
  if(this.Valid)BirthYear=this.ID18.substr(6,4);
  return BirthYear;
}

// 返回生日中的月，格式如下，10
IDCard.prototype.GetBirthMonth = function() {
  var BirthMonth='';
  if(this.Valid)BirthMonth=this.ID18.substr(10,2);
 /// if(BirthMonth.charAt(0)=='0')BirthMonth=BirthMonth.charAt(1);
  return BirthMonth;
}

// 返回生日中的日，格式如下，10
IDCard.prototype.GetBirthDay = function() {
  var BirthDay='';
  if(this.Valid)BirthDay=this.ID18.substr(12,2);
  return BirthDay;
}

// 返回性别，1：男，0：女
IDCard.prototype.GetSex = function() {
  var Sex='';
  if(this.Valid)Sex=this.ID18.charAt(16)%2;
  return Sex;
}

// 返回15位身份证号码
IDCard.prototype.Get15 = function() {
  var ID15='';
  if(this.Valid)ID15=this.ID15;
  return ID15;
}

// 返回18位身份证号码
IDCard.prototype.Get18 = function() {
  var ID18='';
  if(this.Valid)ID18=this.ID18;
  return ID18;
}

// 返回所在省，例如：上海市、浙江省
IDCard.prototype.GetLocal = function() {
  var Local='';
  if(this.Valid)Local=this.Local;
  return Local;
}

IDCard.prototype.GetVCode = function(CardNo17) {
  var Wi = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1);
  var Ai = new Array('1','0','X','9','8','7','6','5','4','3','2');
  var cardNoSum = 0;
  for (var i=0; i<CardNo17.length; i++)cardNoSum+=CardNo17.charAt(i)*Wi[i];
  var seq = cardNoSum%11;
  return Ai[seq];
}

IDCard.prototype.CheckValid = function(CardNo18) {
  if(this.GetVCode(CardNo18.substr(0,17))!=CardNo18.charAt(17))return false;
  if(!this.IsDate(CardNo18.substr(6,8)))return false;
  var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
  if(aCity[parseInt(CardNo18.substr(0,2))]==null)return false;
  this.ID18=CardNo18;
  this.ID15=CardNo18.substr(0,6)+CardNo18.substr(8,9);
  this.Local=aCity[parseInt(CardNo18.substr(0,2))];
  return true;
}

IDCard.prototype.IsDate = function(strDate) {
  var r = strDate.match(/^(\d{1,4})(\d{1,2})(\d{1,2})$/);
  if(r==null)return false;
  var d= new Date(r[1], r[2]-1, r[3]);
  return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[2]&&d.getDate()==r[3]);
}


