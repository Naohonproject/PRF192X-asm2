/** @format */
// tạo đối tượng testScore để lưu giá trị người dùng nhập vào
var testScore = {
	name: "",
	math: 0,
	physical: 0,
	chemistry: 0,
};

// lấy ra các keys của đối tượng testScore bằng cách gọi tới phương thức keys của class Object
var keys = Object.keys(testScore);
// lấy ra tất cả input elements ở trong DOM bằng cách gọi tới DOM API document.querySelectorAll
var userInputs = document.querySelectorAll("input");
// lấy ra elements là nút có value là nhập trong DOM và gán cho nó sự kiện click bằng một handler là hàm inputBtnHandler,hàm này gọi tới hai hàm khác là hàm assignUserScore và displayScore được định nghĩa ở dưới.

var inputBtn = document.querySelector("#input-btn");
inputBtn.addEventListener("click", inputBtnHandler);
function inputBtnHandler() {
	assignUserScore();
	displayScores();
}

//Định nghĩa hàm assignUserScore , hàm này lấy mảng keys để gọi lại phương thức forEach và truyền vào nó là một callback function với hai tham số, một là từng key trong mảng keys và index của chúng,sử dụng key để truy cập vào từng thuộc tính trong đối tượng testScore và gán cho chúng với giá trị bằng từng phần tử trong mảng userInputs bằng cách sử dụng index của các keys trong mảng cũng trùng với index của mảng serInputs.sau khi gán xong thì sẽ tiến hành reset các ô ít put cho chuỗi rỗng để reresh form input.

//start defining assignUserScore
function assignUserScore() {
	keys.forEach(function (key, index) {
		testScore[key] = userInputs[index].value;
		userInputs[index].value = "";
	});
}
//end defining assignUserScore

// lấy ra button tính điểm trung bình và gán cho nó sự kiện click bằng một callback function tên là averageScoreCalc được định nghĩa ở dưới.
var averageBtn = document.querySelector("#average-btn");
averageBtn.addEventListener("click", averageScoreCalc);

// định nghĩa hàm roundToNumberOfPrecision để chuyển giá trị từ input của người dùng từ string sang number với một số sau dấu phẩy động.
// chúng ta sử dụng Unary plus (+) ở trong hàm này,Hàm này trả về một floating number với số chữ số phía sau dấu phẩy là một.
function roundToNumberOfPrecision(number) {
	return +(Math.round(number + "e+1") + "e-1");
}

// Hàm tính điểm trung bình của học sinh bằng cách lấy ra mảng là các một của học sinh đó sau đó sử dụng reduce function để lắp qua có phần tử và thao tác trên chúng, hàm này có giá trị khở tại cho một trong hai tham số là 0.

// lấy ra chính xác là tBody đầu tiên trong số tbody mà bảng có.
var scoreTable = document
	.getElementById("score-table")
	.getElementsByTagName("tbody")[0];

//start defining checkInputs function

function checkInput() {
	// lấy ra một mảng gồm các phần tử là các mảng chứ key và value của đối tượng testScore
	var testScoreEntries = Object.entries(testScore);

	// kiểm tra xem liệu có ô input nào đang bị bỏ trống hay không(liệu tất cả các ô đều đã được fill in)
	var isFillInAllInputs = testScoreEntries.every(function (entry) {
		return entry[1] !== "";
	});

	// lấy ra mảng phụ là mảng chỉ chứa các mảng có chứa thông tin điểm mà người dùng nhập vào, mảng này bắt đầu từ index 1 đến hết mảng chính
	var scoreObjects = testScoreEntries.slice(1);

	// Kiểm tra xem người dùng có nhập đúng thang điểm 10 hay không
	var isScore = scoreObjects.every(function (score) {
		return score[1] >= 1 && score[1] <= 10;
	});

	return isFillInAllInputs && isScore;
}
//end defining checkInput

// định nghĩa hàm displayScores
//start defining displayScores

function displayScores() {
	// kiểm tra hai điều kiện trên, nếu cả hai đúng thì tiến hành tạo bảng dòng mới từ bảng hiện có và render dữ liệu mà người dùng nhập vào với các trường dữ liệu tương ứng trong bảng, mỗi lần người dùng ấn "Nhập" thì sẽ tạo ra một dòng mới phía dưới cùng của bảng
	if (checkInput()) {
		// tạo một hàng mới
		var row = scoreTable.insertRow(-1);

		var cell1 = row.insertCell(0);
		cell1.innerHTML = row.rowIndex;

		// tạo một mảng để chứa các giá trị input người dùng nhập rồi sử dụng vòng lặp để gán chúng cho các cell trong hàng
		var cells = [];
		cells.length = 4;
		var cellsLength = cells.length;
		for (var i = 0; i < cellsLength; i++) {
			cells[i] = row.insertCell(i + 1);
			var key = keys[i];
			cells[i].innerHTML = testScore[key.toString()];
			if (i > 0) {
				cells[i].innerHTML = roundToNumberOfPrecision(
					parseFloat(cells[i].innerHTML)
				);
			}
		}
		var cell6 = row.insertCell(5);
	} else {
		alert("ban phai dien dung thong tin");
	}
}
//end of defining displayScores

//Hàm tính trung bình, hàm này nhận vào một mảng số và trả về giá trị trung bình của mảng.

//start defining averageCalc function
function averageCalc(array) {
	var isArrayOfNumber = array.every((a) => {
		return typeof a === "number";
	});

	if (isArrayOfNumber) {
		var sum = array.reduce(function (a, b) {
			return a + b;
		}, 0);
		return sum / array.length || 0;
	} else {
		return "error,retype";
	}
}
//end defining averageCalc function

//Hàm tính điểm trung bình,Hàm này gọi tới dòng mới nhất trong bản tại thời điểm gọi hàm và từ đó lấy ra các ô trong hàng, thông qua đó tính ra điểm trung bình của người tương ứng và gán chúng lại vào ô cuối cùng trong hàng , tương ứng với cột trung bình(hàm này có sử dụng tới hàm  averageCalc vừa được định nghĩa ở trên )

//start defining averageScoreCalc function
function averageScoreCalc() {
	var latestRow = document
		.querySelector("table")
		.getElementsByTagName("tbody")[0].lastChild;
	var childNodes = latestRow.childNodes;
	var scores = [];
	childNodes.forEach(function (childNode, index) {
		if (index > 1 && index < childNodes.length - 1) {
			scores.push(Number(childNode.textContent));
		}
	});
	var lastestCell = latestRow.lastChild;
	lastestCell.innerHTML = roundToNumberOfPrecision(averageCalc(scores));
}
//end defining averageScoreCalc function

// lấy ra nút đánh giá học sinh và gán cho nó sự kiện click, handler là một callback function tên là determineExelentStudents
var excelStudentDet = document.querySelector("#excel-btn");
excelStudentDet.addEventListener("click", determineExelentStudents);

// hàm này xử lý sự kiện click vào nút "xác định học sinh giỏi" bằng cách lấy hết tất cả các dòng trong bảng (trừ dòng header),giá trị trả về là một NodeList, do đó ta có thẻ loop qua các phần tử trong nó bằng phương thức forEach và cứ mỗi lần lặp là sẽ đánh giá xem liệu điểm trung bình của người tương ứng với mỗi dòng có lớn hơn hoặc bằng 8.0 hay không ,nếu có thì bôi đổ tất cả các ô trong dòng bằng cách gán dòng đó cho một class tên là red-text.

//start defining averageScoreCalc function
function determineExelentStudents() {
	var bodyOfTable = document
		.querySelector("table")
		.getElementsByTagName("tbody")[0];

	var childNodesOfBody = bodyOfTable.childNodes;
	childNodesOfBody.forEach(function (childNode, index) {
		var averageScore = Number(childNode.lastChild.textContent);
		if (averageScore >= 8.0) {
			childNode.classList = "red-text";
		}
	});
}
//end defining averageScoreCalc function

// End of Application .Cảm ơn bạn đã kiên nhẫn.
