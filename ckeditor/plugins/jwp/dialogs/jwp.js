CKEDITOR.dialog.add( 'jwpDialog', function( editor ) {
	
	videoPaths = [];
	for (path in bce_files){
		var fileExt = path.split('.').pop();
		if ( $.inArray(fileExt, ['wmv', 'mp4', 'avi']) !== -1 ){
			videoPaths.push([bce_files[path], path]);
		}
	}
	
	imagesPaths = [];
	for (path in bce_files){
		var fileExt = path.split('.').pop();
		if ( $.inArray(fileExt, ['png', 'gif', 'jpg', 'jpeg']) !== -1 ){
			imagesPaths.push([bce_files[path], path]);
		}
	}
	
	return {

		// Basic properties of the dialog window: title, minimum size.
		title: 'Video Properties',
		minWidth: 400,
		minHeight: 200,
		
		// Dialog window contents definition.
		contents: [
			{
				// Definition of the Basic Settings dialog tab (page).
				id: 'tab-basic',
				label: 'Basic Settings',

				// The tab contents.
				elements: [
					{
						// Text input field for the abbreviation text.
						type: 'select',
						id: 'video_url',
						label: 'Video URL',
						items: videoPaths,
						// Validation checking whether the field is not empty.
						validate: CKEDITOR.dialog.validate.notEmpty( "Video URL field cannot be empty" ),
						widths: [100, 300]
					},
					{
						// Text input field for the abbreviation title (explanation).
						type: 'select',
						id: 'thumb_url',
						label: 'Thumbnail URL',
						items: imagesPaths,
						// Validation checking whether the field is not empty.
						validate: CKEDITOR.dialog.validate.notEmpty( "Thumbnail URL field cannot be empty" ),
						widths: [100, 300]
					}
				]
			},

			// Definition of the Advanced Settings dialog tab (page).
			{
				id: 'tab-adv',
				label: 'Advanced Settings',
				elements: [
					{
						// Another text field for the abbr element id.
						type: 'text',
						id: 'width',
						label: 'Width'
					},
					{
						// Another text field for the abbr element id.
						type: 'text',
						id: 'height',
						label: 'Height'
					}
				]
			}
		],

		// This method is invoked once a user clicks the OK button, confirming the dialog.
		onOk: function() {

			// The context of this function is the dialog object itself.
			// http://docs.ckeditor.com/#!/api/CKEDITOR.dialog
			var dialog = this;

			// Creates a new <abbr> element.
			var video = editor.document.createElement( 'div' );

			// Set element attribute and text, by getting the defined field values.
			var id = "video_" + new Date().getTime();
			video.setAttribute( 'id',  id);
			video.setText( 'loading video ...' );

			// Now get yet another field value, from the advanced tab.
			var vUrl = dialog.getValueOf( 'tab-basic', 'video_url' );
			var tUrl = dialog.getValueOf( 'tab-basic', 'thumb_url' );
			
			var script = editor.document.createElement( 'script' );
			script.setText('\
				jwplayer("'+id+'").setup({\
					file: "' + vUrl + '",\
					height: 360,\
					image: "' + tUrl + '",\
				    width: 640,\
					primary: "flash",\
					fallback: false\
				});\
			');

			// Finally, inserts the element at the editor caret position.
			editor.insertElement( video );
			editor.insertElement( script );
		}
	};
});