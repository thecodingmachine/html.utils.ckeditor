<?php
use Mouf\Html\Utils\WebLibraryManager\WebLibraryInstaller;
use Mouf\Actions\InstallUtils;
use Mouf\MoufManager;

require_once __DIR__."/../../autoload.php";

// Let's init Mouf
InstallUtils::init(InstallUtils::$INIT_APP);

// Let's create the instance
$moufManager = MoufManager::getMoufManager();

WebLibraryInstaller::installLibrary("javascript.ckeditor",
	array(
		'vendor/mouf/html.utils.ckeditor/ckeditor/ckeditor.js'
	)
);

// Let's rewrite the MoufComponents.php file to save the component
$moufManager->rewriteMouf();

// Finally, let's continue the install
InstallUtils::continueInstall();
