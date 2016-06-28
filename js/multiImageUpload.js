//图片上传预览    IE是用了滤镜。
function previewSingleImage (appendDivId,file,preview_callback){
	//var MAXWIDTH  = 190; 
    //var MAXHEIGHT = 130;
    var appendDiv=createImageDiv(appendDivId);
    var length=jQuery(".image").length;
    var img=jQuery(".image")[length-2];    	//-2的原因是因为隐藏域还有一个img
    if (file.files)
    {
    	
    	/** 设置图片样式
    	img.onload = function() {
			var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth,img.offsetHeight);
			img.width = rect.width;
			img.height = rect.height;
			img.style.marginTop = rect.top + 'px';
		}
		*/
		var reader = new FileReader();
		reader.onload = function(evt) {
			img.src = evt.target.result;
		}
		reader.readAsDataURL(file.files[0]);
		if(preview_callback!=undefined){
			preview_callback;//回调函数 处理图片展示之外的脚本
		}
    }
    else //兼容IE
    {
      var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
      file.select();
      var src = document.selection.createRange().text;
      img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
     // var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
     // status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
      appendDiv.innerHTML = "<div id=divhead style='"+sFilter+src+"\"'></div>";
    }
}


function createImageDiv (appendDivId){
	var appendDiv=jQuery("#"+appendDivId).html();
	var tempObj=jQuery(appendDiv);
	jQuery(tempObj).find(".moveDown").hide();
	if (jQuery(".btn_box").length == 1) {
		jQuery(tempObj).find(".moveUp").remove();
	}else if(jQuery(".btn_box").length == 2){
		jQuery(jQuery(".moveDown")[0]).show();
	}else{
		if (jQuery(".btn_box").length == 5) {
			jQuery(tempObj).find(".moveDown").remove();
		}
		var length=jQuery(".moveDown").length;
		jQuery(jQuery(".moveDown")[length-2]).show();
	}
	jQuery(".add_image").before("<div class=\"div_image\">"+jQuery(tempObj).html()+"</div>");
	return appendDiv;
}

function del_img(obj){
	jQuery(obj).parent().parent().remove();
	if(document.getElementsByName("image").length<6){
		jQuery(".upload_img").parent().show();
	}
}

//图片等比例缩放功能 
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
      var param = {top:0, left:0, width:width, height:height};
      if( width>maxWidth || height>maxHeight )
      {
          rateWidth = width / maxWidth;
          rateHeight = height / maxHeight;
          
          if( rateWidth > rateHeight )
          {
              param.width =  maxWidth;
              param.height = Math.round(height / rateWidth);
          }else
          {
              param.width = Math.round(width / rateHeight);
              param.height = maxHeight;
          }
      }
      param.left = Math.round((maxWidth - param.width) / 2);
      param.top = Math.round((maxHeight - param.height) / 2);
      return param;
}