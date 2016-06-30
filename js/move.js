/**
 * 上移
 * @param moveObj 需要移动的对象
 * @param callback 自定义函数,可用于ajax请求更新数据或者其他操作 返回true或者undefined 则上移，返回false，则不动
 */
function moveToUp(moveObj,callback){
	var $moveObj=jQuery(moveObj);
	var $upObj=jQuery(moveObj).prev();//前一个元素
	if(callback==undefined || callback){
		if($upObj.find(".moveUp:visible").length==0 && $upObj.find(".moveDown:visible").length>0 && $moveObj.find(".moveUp:visible").length>0 && $moveObj.find(".moveDown:visible").length==0 ){
			//考虑只有两个可移动的对象
			$upObj.find(".moveUp").show();
			$upObj.find(".moveDown").hide();
			$moveObj.find(".moveUp").hide();
			$moveObj.find(".moveDown").show();
		}else if($moveObj.find(".moveDown:visible").length>0　&& $moveObj.find(".moveUp:visible").length>0 && $upObj.find(".moveUp:visible").length==0 && $upObj.find(".moveDown:visible").length>0){
			//考虑多个可移动对象,当前移动对象是第二个,上一个元素是第一个
			$upObj.find(".moveUp").show();
			$upObj.find(".moveDown").show();
			$moveObj.find(".moveUp").hide();
			$moveObj.find(".moveDown").show();
		}else if($moveObj.find(".moveDown:visible").length==0　&& $moveObj.find(".moveUp:visible").length>0 && $upObj.find(".moveUp:visible").length>0&& $upObj.find(".moveDown:visible").length>0){
			//考虑多个可移动对象,当前移动对象是最后一个
			$upObj.find(".moveUp").show();
			$upObj.find(".moveDown").hide();
			$moveObj.find(".moveUp").show();
			$moveObj.find(".moveDown").show();
		}
		$upObj.before($moveObj);
	}
}

/** 
 * 下移
 * @param moveObj  需要移动的对象
 * @param callback 自定义函数,可用于ajax请求更新数据或者其他操作 返回true或者undefined 则下移，返回false，则不动
 */
function moveToDown(moveObj,callback){
	var $moveObj=jQuery(moveObj);
	var $nextObj=jQuery(moveObj).next();//下一个元素
	if(callback==undefined || callback){
		if($nextObj.find(".moveUp:visible").length>0 && $nextObj.find(".moveDown:visible").length==0 && $moveObj.find(".moveUp:visible").length==0 && $moveObj.find(".moveDown:visible").length>0 ){
			//考虑只有两个可移动的对象
			$nextObj.find(".moveUp").hide();
			$nextObj.find(".moveDown").show();
			$moveObj.find(".moveUp").show();
			$moveObj.find(".moveDown").hide();
		}else if($moveObj.find(".moveDown:visible").length>0　&& $moveObj.find(".moveUp:visible").length>0 && $nextObj.find(".moveUp:visible").length>0 && $nextObj.find(".moveDown:visible").length==0){
			//考虑多个可移动对象,当前移动对象是倒数第二个,下一个元素是最后一个
			$nextObj.find(".moveUp").show();
			$nextObj.find(".moveDown").show();
			$moveObj.find(".moveUp").show();
			$moveObj.find(".moveDown").hide();
		}else if($moveObj.find(".moveDown:visible").length>0　&& $moveObj.find(".moveUp:visible").length==0 && $nextObj.find(".moveUp:visible").length>0&& $nextObj.find(".moveDown:visible").length>0){
			//考虑多个可移动对象,当前移动对象是第一个,下一个元素不是最后一个
			$nextObj.find(".moveUp").hide();
			$nextObj.find(".moveDown").show();
			$moveObj.find(".moveUp").show();
			$moveObj.find(".moveDown").show();
		}
		$nextObj.after($moveObj);
	}
}