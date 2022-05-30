(function () {
	"use strict";

	console.log('v4');

	const CARD_URL_BASE = "./still_images/"
	const CARD_URL_EXT = ".jpg"

	let $main = $('#main');

	let getDepth = function (str) {
		let matchRes = textArr[i].match(/\t/g);
		let matchLen = 0;
		if (matchRes) {
			matchLen = matchRes.length;
		}
		return matchLen;
	};

	let processDesc = function (textArr) {
		let show = function (evt) {
			evt.preventDefault();
			$textDiv.toggle(400);
		};

		let hider = function (callback) {
			$textDiv.hide(400, callback);
		}
		let $retdiv = $('<div>');
		let $clickDiv = $('<p>').appendTo($retdiv);
		let $display = $('<a>', {href: "#", text: "Show Explanation"})
			.click(show)
			.appendTo($clickDiv);
		let $textDiv = $('<p>', {style: "display:none;"}).appendTo($retdiv);
		let newList = function () {
			return $('<ul>', {style: "text-align: left"});
		}
		let makeEntry = function (text) {
			return $('<li>', {text: text});
		}
		let makeList = function (arr) {
			let $list = newList();
			console.log(arr);
			arr.forEach(function (line) {
				if (Array.isArray(line)) {
					makeList(line).appendTo($list);
				} else {
					makeEntry(line).appendTo($list);
				}
			});
			return $list;
		}
		$textDiv.append(makeList(textArr));
		return {
			div: $retdiv,
			hider: hider
		};
	};

	let buildCard = function (index) {
		$main.empty();
		$main.addClass('roundedWhite');
		let $card = $('<div>', {class:"flip-card"}).appendTo($main);
		let $innercard = $('<div>', {class:"flip-card-inner"}).appendTo($card)
		let $front = $('<div>', {id: "flip-card-front", class: "flip-card-front"}).appendTo($innercard);
		let $back = $('<div>', {id: "flip-card-back", class: "flip-card-back cover-container d-flex w-100 h-100 p-3 mx-auto flex-column"}).appendTo($innercard);
		
		// add solution on back
		$('<header>',{class: "mb-auto"}).appendTo($back);
		let $backTitle = $('<h1>').appendTo($back);
		let $exp = $('<div>',{class: "explanation"}).appendTo($back);
		let $backBnts = $('<footer>',{class: "mt-auto"}).appendTo($back);

		if (index >= DATA.length) {
			$card.toggleClass("flipit");
			$backTitle.text("THE END");
			$exp.text("Reload to start over!");
			return;
		}

		let cardObj = DATA[index];

		// add photo
		let imgURL = CARD_URL_BASE + cardObj.img + CARD_URL_EXT;
		$("<img>", {src: imgURL}).appendTo($('<div>', {class: "cardImgHold"}).appendTo($front));

		// add directions
		$('<div>', {text: "(scroll left to right on image)", class: "text-center"}).appendTo($front);

		// add solution on back
		$backTitle.text(cardObj.solution);
		let descrip = processDesc(cardObj.description);
		$exp.append(descrip.div);
		
		//add flip buttons
		let flipFunc = function (evt) {
			evt.preventDefault();
			let z = $('#flip-card-front').css('z-index');
			if (z === "9") {
				$('#flip-card-front').css('z-index', "8");
				$('#flip-card-back').css('z-index', "9");
			} else {
				$('#flip-card-front').css('z-index', "9");
				$('#flip-card-back').css('z-index', "8");
			}
			descrip.hider(function () {
				$card.toggleClass("flipit");
			});
		};
		let flipBtnParams = {text: "Flip Card", href: "#", class: "btn btn-primary btn-center"};

		$('<a>', flipBtnParams)
			.click(flipFunc)
			.appendTo($('<div>').appendTo($front));
		// let $backBnts = $('<p>').appendTo($back);
		$('<a>', flipBtnParams)
			.click(flipFunc)
			.appendTo($backBnts);

		// add next button
		$('<a>', {text: "Next Card", href: "#", class: "btn btn-success btn-center"})
			.click(function (evt) {
				evt.preventDefault();
				buildCard(index + 1);
			})
			.appendTo($backBnts);
	}

	// Create button function
	$('#startCards').click(function (evt) {
		evt.preventDefault();
		buildCard(0);
	});

	return;
}())