<<<<<<< HEAD
module.exports.ConvertToPath = str => {
=======
//TODO: friendly URL
//TODO: if not => 404 page
//TODO: Real data (get API)
//TODO: Progress circle (load)
//TODO: React Table
//TODO: React Responsive Modal

module.exports.convertToPath = str => {
>>>>>>> ab07065958525bf832c0dab4e12430bb3cecacbd
   str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
   str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
   str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
   str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
   str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
   str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
   str = str.replace(/đ/g, "d");
   str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
   str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
   str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
   str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
   str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
   str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
   str = str.replace(/Đ/g, "D");
<<<<<<< HEAD
   str = str.replace(/\s+/g, '-');
   return str;
=======
   str = str.replace(/\s+/g, "-");
   return str;
};

module.exports.convertToFriendlyPath = (endpoint, title, id) => {
   let pathWithRegex = this.convertToPath(title).toLowerCase();
   return endpoint + "/" + pathWithRegex + "-" + id;
>>>>>>> ab07065958525bf832c0dab4e12430bb3cecacbd
};

module.exports.validateEmail = email => {
   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
};

module.exports.validateDate = date => {
   var re = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
   return re.test(String(date).toLowerCase());
};

module.exports.validUsername = username => {
<<<<<<< HEAD
   var re = '^(?=.{8,24}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$';
=======
   var re = "^(?=.{8,24}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$";
>>>>>>> ab07065958525bf832c0dab4e12430bb3cecacbd
   return username.match(re);
};

module.exports.getCurrentDate = () => {
   var today = new Date();
   var dd = String(today.getDate()).padStart(2, "0");
   var mm = String(today.getMonth() + 1).padStart(2, "0");
   var yyyy = today.getFullYear();
   return yyyy + "-" + mm + "-" + dd;
};

module.exports.getAge = dateString => {
   var today = new Date();
   var birthDate = new Date(dateString);
   var age = today.getFullYear() - birthDate.getFullYear();
   var m = today.getMonth() - birthDate.getMonth();
   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
   }
   return age;
};
