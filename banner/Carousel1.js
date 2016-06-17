var Scoll = {
	num: parseInt($('.scoll div').length), 
	width: parseInt($('.scoll div:eq(0)').width()), 
	reset: function(){
		var that = this;
		for (var i = 0; i < that.num; i++){
			$('.scoll div:eq('+i+')').css({'top': '-'+(410*i)+'px', 'left': '-' + (that.width*i)+'px'});
		}
	},
	turn: function(num){
		var that = Scoll,
			slide_num = that.num,
			num = num % slide_num;
			
		isRunning = true;

		if(num == 0){
			that.reset();
			num = 1;
		}
		var move = parseInt($('.scoll div:eq('+num+')').css('left'));
		for(var i = 0; i < slide_num; i++){
			var left = parseInt($('.scoll div:eq('+i+')').css('left')) - move;
			$('.scoll div:eq('+i+')').animate({left: left+'px'},function ()
			    {				   
				    isRunning = false;
			    });
		}

		this.turnId = num;
		$('.pages div').removeClass();
		$('.pages div[pageNum = "'+ this.turnId%(slide_num-1)+'"]').addClass('focus');
	},
	autoTurn: function(){
		var that = Scoll;
		that.turn(that.turnId + 1);
	},
	turnTo: function(num){
		var that = Scoll;
		that.destroy();
		if(num == 0){
			num = that.num - 1;
		}
		this.turn(num);
		that.open();
	},
	makePages: function(){
		var html = '<div class="pages">',
			num = this.num - 1;
		for (var i = 0; i < num; i++){
			html += '<div pageNum="'+i+'"></div>'
		}
		html += '</div>';
		$('.scollCont').append(html);
		$('.pages').css('width', 32*num+'px');
		$('.pages').css('left',($('.scoll').width()-$('.pages').width())/2+'px');
		$('.pages div[pageNum="0"]').addClass('focus');
	},
	open: function(){
		var that = this;
		if (!that.setId){
			that.setId = setInterval(that.autoTurn, 2000);
		}
	},
	destroy: function(){
		var that = this;
		if (!!that.setId){
			clearInterval (that.setId);
			that.setId = null;
		}
	},
	bind: function(){
		var that = Scoll;
		$('.btnLeft').css('visibility', 'hidden');
		$('.btnRight').css('visibility', 'hidden');
		$('.btnLeft').on('click', function(){
			if (isRunning)
		    {
			    return false;
		    }
			that.turnTo(that.turnId - 1);
		});
		$('.btnRight').on('click', function(){
			if (isRunning)
		    {
			    return false;
		    }
			that.turnTo(that.turnId + 1);
		});
		$('.pages div').on('click',function(){
			that.turnTo(parseInt($(this).attr('pageNum')));
		})
		$('.scollCont').on('mouseenter',function(){
			$('.btnLeft').css('visibility', 'visible');
			$('.btnRight').css('visibility', 'visible');
			that.destroy();
		}).on('mouseleave',function(){
			that.open();
			$('.btnLeft').css('visibility', 'hidden');
			$('.btnRight').css('visibility', 'hidden');
		});
	},
	init: function(){
		var isRunning = false;
		this.turnId = 0;
		this.reset();
		this.makePages();
		this.open();
		this.bind();
	}
}

Scoll.init();