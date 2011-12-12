/**
 * @author Ezra Velazquez
 * Background Image Source = http://craft.nunodoll.com/santa/santa_claus.jpg
 * CONTENTS: Test cases
 */
var pw = new AV.PaintWidget(320,400);
var newImage = document.createElement('img');

/**
 * SETUP
 */
module('Setup');
	test('init', function() {
			ok(!pw.setBackground(myImage), "Set Background Image");
			
			pw.currentLayerIndex = 0;
			equals(pw.currentLayerIndex, 0, "Current Layer Index is 0");
			
			//pw.width = pw.canvas.width =  myImage.width;
			//pw.height = pw.canvas.height = myImage.height;
			
			ok(!pw.setDimensions(320,400), 'Dimensions Updated to 320x400');
			equals(pw.width, 320, "Canvas width is 320");
			equals(pw.height, 400, "Canvas height is 400");
			
			ok(!pw.setMouseCursor('pointer'), 'Set Cursor to Pointer');
			equals(avpw$(pw.canvas).css('cursor'), 'pointer', 'CSS cursor set to pointer'); 			
			// equals(pw.busy, false, 'Not Busy');
			// equals(pw.active, null, 'Null active');
			equals(pw.layers.length, 1, 'Only one layer');
		});

/**
 * BRIGHTNESS
 */		
module('Brightness');
	test('init', function() {
		pw.layerDelete(0);
		pw.setBackground(myImage);
		pw.currentLayerIndex = 0;
		
		ok(!pw.module.brightness.activate(pw), 'Initialize Brightness');
		ok(!pw.module.brightness.set(2, 1, true), 'Brightness Set');
		
		commitCompare(pw.module.brightness.commit, brightness_set, "Brightness", 100);
		resetActionStack(pw.module.brightness.reset, "Brightness", 200);
		deactivateModule(pw.module.brightness.deactivate, "Brightness", 300);
		resetCanvas(400);		
	});

/**
 * CONTRAST
 */	
module('Contrast');
	test('init', function() {
		ok(!pw.module.contrast.activate(pw), 'Initialize Contrast');
		ok(!pw.module.contrast.set(1, 2, true), 'Contrast Set');
		
		commitCompare(pw.module.contrast.commit,contrast_set, "Contrast", 100);
		resetActionStack(pw.module.contrast.reset, "Contrast", 200);
		deactivateModule(pw.module.contrast.deactivate, "Contrast", 300);
		resetCanvas(400);	  
	});

/**
 * COLORS
 */	
module('Colors');		
	test('init', function() {
		ok(!pw.module.colors.activate(pw), "Initialize Color");
		ok(!pw.module.colors.set(100,-100,-100, true), 'Color Set');
		
		commitCompare(pw.module.colors.commit, colors_set, "Colors", 100);
		resetActionStack(pw.module.colors.reset, "Colors", 200);
		deactivateModule(pw.module.colors.deactivate, "Colors", 300);
		resetCanvas(400);
	});

/**
 * SHARPEN
 */
module('Sharpen');
	test('init', function() {
		ok(!pw.module.sharpen.activate(pw), "Initialize Sharpen");
		ok(!pw.module.sharpen.set(67, true), 'Sharpen Set');
		
		commitCompare(pw.module.sharpen.commit, sharpen_set, "Sharpen", 100);
		resetActionStack(pw.module.sharpen.reset, "Sharpen", 200);
		deactivateModule(pw.module.sharpen.deactivate, "Sharpen", 300);
		resetCanvas(400);
	});
	
/**
 * BLUR
 */
module('Blur');
	test('init', function() {
		ok(!pw.module.blur.activate(pw), 'Initialize Blur');		
		ok(!pw.module.blur.set(5, true), 'Blur Set');
		
		commitCompare(pw.module.blur.commit, blur_set, "Blur", 100);
		resetActionStack(pw.module.blur.reset, "Blur", 200);
		deactivateModule(pw.module.blur.deactivate, "Blur", 300);
		resetCanvas(400);
	});

/**
 * BLEMISH
 */
module('Blemish');
	test('init', function() {
		ok(!pw.module.blemish.activate(pw), 'Initialize Blemish');
		
		ok(!pw.module.blemish.setRadius(50), 'Set Radius');
		ok(!pw.module.blemish.updateUI(150,220), "Update UI");
		
		applyCompare(pw.module.blemish.apply, blemish_apply, "Blemish", 100, 150, 220);
		resetActionStack(pw.module.blemish.userUndo, "Blemish", 200);
		deactivateModule(pw.module.blemish.deactivate, "Blemish", 300);
		resetCanvas(400);
	});
	
/**
 * REDEYE
 */	
module('Red Eye');
	test('init', function() {
		ok(!pw.module.redeye.activate(pw), 'Inititalize Red Eye');
		
		ok(!pw.module.redeye.setRadius(50), 'Set Radius');
		ok(!pw.module.redeye.setMode('redeye'), 'Set mode to greeneye');
		
		applyCompare(pw.module.redeye.apply, redeye_apply, "Red Eye", 100, 100, 150);
		resetActionStack(pw.module.redeye.userUndo, "Red Eye", 200);
		deactivateModule(pw.module.redeye.deactivate, "Red Eye", 300);
		resetCanvas(400);
	});
	
/**
 * WHITEN
 */
module('Whiten');
	test('init', function() {
		ok(!pw.module.whiten.activate(pw), 'Initialize Whiten');
		
		ok(!pw.module.whiten.setRadius(20), 'Set Radius');
		ok(!pw.module.whiten.updateUI(20,20), "Update UI");
		
		applyCompare(pw.module.whiten.apply, whiten_apply, "Whiten", 100, 50, 50);
		resetActionStack(pw.module.whiten.userUndo, "Whiten", 200);
		deactivateModule(pw.module.redeye.deactivate, "Whiten", 300);
		resetCanvas(400);
	});
	
/**
 * DRAWING
 */
module('Drawing');
	test('init', function() {
		ok(!pw.module.drawing.activate(pw), 'Initialize Drawing');
		
		ok(!pw.module.drawing.setSoftness(75), 'Set Softness');
		equals(pw.module.drawing.softness(), 75, 'Softness equals 75');
		
		ok(!pw.module.drawing.setWidth(30), 'Set Width');
		equals(pw.module.drawing.width(), 30, 'Width equals 10');
		
		ok(!pw.module.drawing.setColor('#FF6600'), 'Set Color to Orange');
		equals(pw.module.drawing.color(), '#FF6600', 'Color is hex value of orange');
		
		ok(!pw.module.drawing.updateUIDown(100,100), 'Update UI Down');
		ok(!pw.module.drawing.updateUIMove(200,200), 'Update UI Move');
		ok(!pw.module.drawing.updateUIDraw(200,200), 'Update UI Draw');
		
		ok(!pw.module.drawing.updateUIDown(200,100), 'Update UI Down');
		ok(!pw.module.drawing.updateUIMove(200,200), 'Update UI Move');
		ok(!pw.module.drawing.updateUIDraw(100,200), 'Update UI Draw');
		
		ok(!pw.module.drawing.setErase(true), 'Set erase TRUE');
		equals(pw.module.drawing.erase(), true, 'Erase is set to true');
		
		ok(!pw.module.drawing.updateUIDown(200,100), 'Update UI Down');
		ok(!pw.module.drawing.updateUIMove(200,200), 'Update UI Move');
		ok(!pw.module.drawing.updateUIDraw(100,200), 'Update UI Draw');
		
		applyCompare(pw.module.drawing.apply, drawing_apply, "Drawing", 100, 200, 200);
		resetActionStack(pw.module.drawing.userUndo, "User", 200);
		deactivateModule(pw.module.drawing.deactivate, "Drawing", 300);
		resetCanvas(400);
		completeReset(500);
	});
		
/**
 * STICKERS
 */
module('Stickers');
	test('init', function() {	
		ok(!pw.module.overlay.activate(pw), 'Initialize Stickers');
		
		pw.overlayRegistry.add('http://localhost/week_13/qunit/bandaid_01.png', sticker);
		pw.overlayRegistry.addElement('http://localhost/week_13/qunit/bandaid_01.png', sticker);
	
		ok(pw.module.overlay.newOverlay("http://localhost/week_13/qunit/bandaid_01.png", 150, 200, 2, 2, 15), 'Add sticker');
			
		ok(!pw.module.overlay.updateUIDown(160,210), 'Update UI Down');
		ok(!pw.module.overlay.updateUIMove(200,200), 'Update UI Move');
	
		applyCompare(pw.module.overlay.apply, stickers_apply, "Stickers", 100, 5, 5);
		resetActionStack(pw.module.overlay.userUndo, "Undo", 200);
		deactivateModule(pw.module.overlay.deactivate, "Drawing", 300);
		resetCanvas(400);
		completeReset(500);	
	});

/**
 * TEXT
 */
module('Text');
	test('init', function() {
		ok(!pw.module.text.activate(pw), 'Initialize Drawing');

		/**
		 * set the text
		 * newText(str, fontName, fontSizePx, fontColor, shadowColor, x, y, sx, sy, rot)
		 *
		 * @param str string to display
		 * @param fontName in the format '10px sans-serif'
		 * @param fontSizePx integer size of font
		 * @param fontColor in the #FFFFF, #FFF, or rgb(255,255,255) format
		 * @param shadowColor in the #FFFFFF, #FFF, or rgb(255,255,255) format
		 * @param x x-coordinate for placement of text, optional
		 * @param y y-coordinate for placement of text, optional
		 * @param sx x-coordinate scaling, optional
		 * @param xy y-coordinate scaling, optional
		 * @param rot angle (in degrees) of text, optional
		 */
		ok(!pw.module.text.newText('yo', '10px sans-serif', 36, 'rgb(10,10,10)', 'rgb(100,100,100)', 100, 100, 1, 1, 5), 'Set text settings');
		ok(!pw.module.text.updateUIDown(110,110), 'Update UI Down');
		ok(!pw.module.text.updateUIMove(200,200), 'Update UI Move');

		applyCompare(pw.module.text.apply, text_apply, "Text", 100, 5, 5);
		deactivateModule(pw.module.text.deactivate, "Text", 300);
		resetCanvas(400);
		completeReset(500);
	});
	
/**
 * ROTATE
 */
module('Rotate');
	test('init', function() {
		ok(!pw.module.rotate90.activate(pw), 'Initialize Rotate');
		
		applyCompare(pw.module.rotate90.rotate90, rotate_action, "Rotate", 100, 180, true);
		completeReset(200);
	});
	
/**
 * FLIP
 */
module('Flip');
	test('init', function() {
		ok(!pw.module.flip.activate(pw), 'Initialize Flip');
		
		applyFlip(pw.module.flip.flip,flip_horizontal, "Horizontal", 100, true, false, true);
		undo(200);
		
		applyFlip(pw.module.flip.flip, flip_vertical, "Vertical", 200, false, true, true);
		undo(300);
		
		applyFlip(pw.module.flip.hflip, flip_horizontal, "Horizontal - Convenience", 400, true, false, true);
		undo(500);
		
		applyFlip(pw.module.flip.vflip, flip_vertical, "Vertical - Convenience", 600, true, false, true);
		undo(700);
		
		applyFlip(pw.module.flip.flip, flip_hv, "Horizontal & Vertical", 800, true, true, true);
		undo(900);
		
		applyFlip(pw.module.flip.hvflip, flip_hv, "Horizontal & Vertical - Convenience", 1000, true, false, true);
		undo(1100);	
	});
	
/**
 * RESIZE
 */
module('Resize');
	test('init', function() {
		ok(!pw.module.resize.activate(pw), 'Initialize Resize');

		applyFlip(pw.module.resize.resize, resize_action, "Resize", 100, 100, 100, true);
		undo(200);	
	});
	
/**
 * CROP
 */
module('Crop');
	test('init', function() {
		ok(!pw.module.crop.activate(pw), 'Initialize Crop');
		
		ok(!pw.module.crop.forceAspect(true), 'Force Aspect');
		ok(!pw.module.crop.updateUIDown(0,0), 'Update UI Down');
		ok(!pw.module.crop.updateUIMove(50,50), 'Update UI Move');
		ok(!pw.module.crop.setInitialSelectionTo(20,20), 'Set Initial Selection To');
		ok(!pw.module.crop.setInitialSelectionByRatio(1/2), 'Set Initial Selection By Ratio');
		
		userDo(pw.module.crop.crop, 'Crop Set', 100);
		applyCompare(pw.module.crop.apply, crop_apply, "Crop", 200, 50, 50);
		
		 undo(300);
		 completeReset(400);
		 deactivateModule(pw.module.text.deactivate, "Text", 500);
	});
	
/**
 * BULGE
 */	
module('Bulge');
	test('init', function() {
		ok(!pw.module.bulge.activate(pw), "Initialize Bulge");
		
		ok(!pw.module.bulge.setRadius(100), "Radius set to 10");
		ok(!pw.module.bulge.setPower(100), "Power set to 10");
		ok(!pw.module.bulge.updateUI(200,100), "Update UI");
		
		applyCompare(pw.module.bulge.apply, bulge_apply, "Bulge", 100, 200, 100);
		
		undo(200);
		completeReset(300);
		deactivateModule(pw.module.bulge.deactivate, "Bulge", 400);
	});	
	
/**
 * BARREL
 */
module('Barrel');
	test('init', function() {
		ok(!pw.module.barrel.activate(pw), 'Initialize Barrel');
		ok(!pw.module.barrel.set(100,true), 'Set Barrel');
		commitCompare(pw.module.barrel.commit, barrel_set, "Barrel", 100);
		resetActionStack(pw.module.barrel.reset, "Barrel", 200);
		deactivateModule(pw.module.barrel.deactivate, "Barrel", 300);
		resetCanvas(400);
	});