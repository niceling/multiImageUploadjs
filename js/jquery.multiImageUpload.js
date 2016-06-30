;(function($) {
	$.fn.imageupload = function(options) {
		var obj = $.extend({}, $.fn.imageupload.defaults, options);  
		
		return this.change(function(){
			if(this.value.length>0){
				var appendDiv=appendElement(obj);
				var length=jQuery("."+obj.imgClass+":visible").length;
				var img=jQuery("."+obj.imgClass+":visible")[length-1];    	
				 if (this.files)
			    {
					var reader = new FileReader();
					reader.onload = function(evt) {
						img.src = evt.target.result;
					}
					reader.readAsDataURL(this.files[0]);
			    }
			    else //兼容IE
			    {
			      var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
			      this.select();
			      var src = document.selection.createRange().text;
			      img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
			      appendDiv.innerHTML = "<div id=divhead style='"+sFilter+src+"\"'></div>";
			    }
			    if(obj.size==length){
			    	jQuery("#"+obj.addContainerId).hide();
			    }
			    if($.isFunction(obj.previewImageCallBack)){
			    	obj.previewImageCallBack.apply(this);
				}
			    if(obj.imageResetable){//图片可重置
			    	jQuery("."+obj.imageResetClass).change(function(){
			    		resetImage(this,obj);
			    	});
				}
			    if(obj.deleteable){//可删除图片
			    	jQuery("."+obj.deleteImageClass).click(function(){
			    		removeImage(this,obj);
			    	});
			    }
			    
			}
		});
	};
	
	function removeImage(obj,settings){
		var index=jQuery("."+settings.deleteImageClass).index(obj);
		jQuery(jQuery("."+settings.appendElementId)[index]).remove();
		var length=jQuery("."+settings.appendElementId+":visible").length;
		if(settings.buttonBarVisible){
   			setButtonBarPosition(length,settings);
   		}
		if(length<settings.size){
			jQuery("#"+settings.addContainerId).show();
		}
		
	}
	
	
	function resetImage(obj,settings){
			if(obj.value.length>0){
				var index=jQuery("."+settings.imageResetClass).index(obj);
				var img=jQuery("."+settings.imgClass+":visible")[index];   
				if (obj.files)
			    {
					var reader = new FileReader();
					reader.onload = function(evt) {
						img.src = evt.target.result;
					}
					reader.readAsDataURL(obj.files[0]);
			    }
			    else //兼容IE
			    {
			      var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
			      obj.select();
			      var src = document.selection.createRange().text;
			      img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
			    }
			}
	}

   //私有方法获取buttonBar
   function appendElement(settings){
   		var appendDiv=jQuery("#"+settings.appendElementId).html();
   		jQuery("#"+settings.addContainerId).before(appendDiv); 
   		var length=jQuery(".btn_box:visible").length;
   		if(settings.buttonBarVisible){
   			setButtonBarPosition(length,settings);
   		}else{
   			jQuery("."+settings.moveUpClass+":visible").hide();
   			jQuery("."+settings.moveDownClass+":visible").hide();
   		}
   		if(!settings.imageResetable){
   			jQuery("."+settings.imageResetClass+":visible").parent().hide();
   		}
   		if(!settings.deleteable){
   			jQuery("."+settings.deleteImageClass+":visible").hide();
   		}
   		return appendDiv;
   }
   
   
   function setButtonBarPosition(length,settings){
   	if (length == 1) {
		jQuery("." + settings.moveUpClass + ":visible").hide();
		jQuery("." + settings.moveDownClass + ":visible").hide();
	} else if (length <= settings.size) {
		jQuery("." + settings.moveUpClass).show();
		jQuery("." + settings.moveDownClass).show();
		jQuery(jQuery("." + settings.moveUpClass + ":visible")[0]).hide();
		jQuery(jQuery("." + settings.moveDownClass + ":visible")[length - 1]).hide();
	}
   }
   
   
	
   // 插件的defaults     
   $.fn.imageupload.defaults = {     
		size:5,
		imgClass:'image',
		moveUpClass:'moveUp',
		moveDownClass:'moveDown',
		imageResetClass:'fileInputReset',
		addContainerId:'add_image',
		appendElementId:'div_image',
		previewImageCallBack:null,
		firstMoveUpVisible:false,
		lastMoveDownVisible:false,
		buttonBarVisible:true,
		imageResetable:true,
		resetImageCallBack:null,
		deleteable:true,
		deleteImageClass:'delete_image'
  };  
})(jQuery);