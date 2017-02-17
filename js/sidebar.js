(function(){
	var Menubar = function() {
		this.el = document.querySelector('#sidebar ul');
		this.state = 'allClosed'; //hasOpened
		this.el.addEventListener('click',function(e) {
			e.stopPropagation();
		});
		var self = this;
		this.currentOpendMenuContent = null;
		this.menuList = document.querySelectorAll('#sidebar ul > li');
		for (var i = 0; i < this.menuList.length; i++) {
			this.menuList[i].addEventListener('click',function(e) {
				var menuContentEl = document.getElementById(e.currentTarget.id + '_content');
				if (self.state === 'allClosed') {
					console.log('打开' + menuContentEl.id);
					console.log(self.menuList);
					menuContentEl.style.top = '0';
					menuContentEl.style.left = '-80px';
					menuContentEl.className = 'nav_content';
					menuContentEl.classList.add('menuContent_move_right');
					self.state = 'hasOpened';
					self.currentOpendMenuContent = menuContentEl;
				}else{
					console.log('关闭' + self.currentOpendMenuContent.id);
					self.currentOpendMenuContent.className = 'nav_content';
					self.currentOpendMenuContent.style.top = '0';
					self.currentOpendMenuContent.style.left = '40px';
					self.currentOpendMenuContent.classList.add('menuContent_move_left');
					console.log('打开' + menuContentEl.id);
					menuContentEl.className = 'nav_content';
					menuContentEl.style.top = '-250PX';
					menuContentEl.style.left = '40px';
					menuContentEl.classList.add('menuContent_move_up');
					self.state = 'hasOpened';
					self.currentOpendMenuContent = menuContentEl;
				}
			});
		}
        Menu();
	};
	var Menu = function() {
		this.menuContentList = document.querySelectorAll('.nav_content > div.nav_con_close');
			for (i = 0; i < this.menuContentList.length; i++) {
				this.menuContentList[i].addEventListener('click',function(e) {
					var menuContent = e.currentTarget.parentNode;
					menuContent.className = 'nav_content';
					menuContent.style.top = '0';
					menuContent.style.left = '40px';
					menuContent.classList.add('menuContent_move_left');
					this.state = 'allClosed';
				});
			}
	};
	var Sidebar = function(eId,closebarId) {
		this.state = 'opened';
		this.el = document.getElementById(eId||'sidebar');
		this.closebarEl = document.getElementById(closebarId||'closebar');
		var self = this;      //闭包
		this.menubar = new Menubar();
		this.menu = new Menu();
		this.el.addEventListener('click',function(event) {
			if (event.target !== self.el) {
				self.triggerSwich();	
			}
		});
	};
	Sidebar.prototype.close = function() {
		console.log('关闭sidebar');
		if (this.menubar.state==='hasOpened') {
			var ml = document.querySelectorAll('.nav_content');
			for (i = 0; i < ml.length; i++) {
					ml[i].className = 'nav_content';
					ml[i].style.top = '0';
					ml[i].style.left = '40px';
					ml[i].classList.add('menuContent_move_close_left');
					this.menubar.state = 'allClosed';
			}
		}
		this.el.style.left = '0';
		this.el.className = 'sidebar_move_left';
		this.closebarEl.style.left ='40px';
		this.closebarEl.className = 'closebar_move_right';
		this.state = 'closed';
	};
	Sidebar.prototype.open = function() {
		console.log('打开sidebar');
		this.el.style.left="-120px";
		this.el.className = 'sidebar_move_rigth';
		this.closebarEl.className = 'closebar_move_left';
		this.closebarEl.style.left ='160px';
		this.state = 'opened';
	};
	Sidebar.prototype.triggerSwich = function() {
		if (this.state === 'opened') {
			this.close();
		}else{
			this.open();
		}
	};
	var sidebar = new Sidebar();
})();     //立即执行函数()()减少全局污染