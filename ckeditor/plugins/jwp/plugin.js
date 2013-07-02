/**
 * Basic sample plugin inserting abbreviation elements into CKEditor editing area.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 */

// Register the plugin within the editor.
CKEDITOR.plugins.add( 'jwp', {

	// Register the icons.
	icons: 'jwp',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {

		// Define an editor command that opens our dialog.
		editor.addCommand( 'jwp', new CKEDITOR.dialogCommand( 'jwpDialog' ) );

		// Create a toolbar button that executes the above command.
		editor.ui.addButton( 'Jwp', {

			// The text part of the button (if available) and tooptip.
			label: 'Insert Abbreviation',

			// The command to execute on click.
			command: 'jwp',

			// The button placement in the toolbar (toolbar group name).
			toolbar: 'insert'
		});

		// Register our dialog file. this.path is the plugin folder path.
		CKEDITOR.dialog.add( 'jwpDialog', this.path + 'dialogs/jwp.js' );
	}
});

