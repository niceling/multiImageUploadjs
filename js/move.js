/**
 * 上移
 * @param moveObj 需要移动的对象
 * @param callback 自定义函数,可用于ajax请求更新数据或者其他操作 返回true或者undefined 则上移，返回false，则不动
 */
function moveToUp(moveObj,callback){
	var $moveObj=jQuery(moveObj);
	var $upObj=jQuery(moveObj).prev();//前一个元素
	var tempObj=$moveObj;
	if(callback==undefined || callback){
		if((!$upObj.find(".moveUp:visible").length>0) && $upObj.find(".moveDown:visible").length>0){//判读上一个元素是否是第一个元素
			var appendElement=tempObj.find(".moveUp");
			tempObj.find(".moveUp").remove();//需要将当前元素的下移移除
			$upObj.find(".moveUp").remove();
			$upObj.find(".moveDown").before(appendElement);//将上一个元素添加一个下移功能
		}
		if((!tempObj.find(".moveDown:visible").length>0)　&& tempObj.find(".moveUp:visible").length>0){//判读当前元素是否是最后一个元素
			var appendElement=$upObj.find(".moveDown");
			$upObj.find(".moveDown").remove();//需要将上一个元素的下移移除
			tempObj.find(".moveDown").remove();
			tempObj.find(".moveUp").after(appendElement);//当前元素则添加一个下移功能
		}
		$moveObj.remove();
		$upObj.before(tempObj);
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
	var tempObj=$moveObj;
	if(callback==undefined || callback){
		if((!$nextObj.find(".moveDown:visible").length>0) && $nextObj.find(".moveUp:visible").length>0){//判读下一个元素是否是最后一个元素
			var appendElement=tempObj.find(".moveDown");
			tempObj.find(".moveDown").remove();//需要将当前元素的下移移除
			$nextObj.find(".moveDown").remove();
		    $nextObj.find(".moveUp").after(appendElement);//最后一个元素，则需要添加一个下移功能
		}
		if((!tempObj.find(".moveUp:visible").length>0) && tempObj.find(".moveDown:visible").length>0){//判读当前元素是否是第一个元素
			var appendElement=$nextObj.find(".moveUp");
			$nextObj.find(".moveUp").remove();//需要将下一个元素的上移移除
			tempObj.find(".moveUp").remove();
			tempObj.find(".moveDown").before(appendElement);//当前元素为第一个元素，则需要添加一个上移功能
		}
		$moveObj.remove();
		$nextObj.after(tempObj);
	}
}