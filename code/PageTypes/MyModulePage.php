<?php

class MyModulePage extends Page {

	private static $db			 = array(
	);
	private static $has_one		 = array(
	);
	private static $many_many	 = array(
	);
	private static $description	 = "My module page";
	private static $icon		 = "silverstripe-module-boilerplate/assets/images/sitetree-images/MyModulePageIcon.png";

	public function populateDefaults() {
		parent::populateDefaults();
	}

	public function getCMSFields() {
		$fields = parent::getCMSFields();
		return $fields;
	}

}

class MyModulePage_Controller extends Page_Controller {

	/**
	 * An array of actions that can be accessed via a request. Each array element should be an action name, and the
	 * permissions or conditions required to allow the user to access it.
	 *
	 * <code>
	 * array (
	 *     'action', // anyone can access this action
	 *     'action' => true, // same as above
	 *     'action' => 'ADMIN', // you must have ADMIN permissions to access this action
	 *     'action' => '->checkAction' // you can only access this action if $this->checkAction() returns true
	 * );
	 * </code>
	 *
	 * @var array
	 */
	private static $allowed_actions = array(
	);

	public function init() {
		parent::init();
		$this->addModuleRequirements();
	}

	/**
	 *
	 * @return array List of JavaScript files to include when this page type loads
	 */
	protected function getModuleJavascriptFiles() {
		return array(
			$this->getModuleAssetFile(MY_MODULE_DIR . '/assets/css/ModuleJS.js')
		);
	}

	/**
	 *
	 * @return array List of CSS files to include when this page type loads
	 */
	protected function getModuleCSSFiles() {
		return array(
			$this->getModuleAssetFile(MY_MODULE_DIR . '/assets/css/MyModuleCSS.css')
		);
	}

	/**
	 * Adds Javascript and CSS module to Requirements
	 * Calls getModuleJavascriptFiles and getModuleCSSFiles
	 *
	 * @see getModuleJavascriptFiles
	 * @see getModuleCSSFiles
	 */
	public function addModuleRequirements() {
		if (Director::isDev()) {
			foreach ($this->getModuleJavascriptFiles() as $script) {
				Requirements::javascript($script);
			}
			foreach ($this->getModuleCSSFiles() as $cssFile) {
				Requirements::css($cssFile);
			}
		} else {
			Requirements::combine_files(__CLASS__ . '.js', $this->getModuleJavascriptFiles());
			Requirements::combine_files(__CLASS__ . '.css', $this->getModuleCSSFiles());
		}
	}

	/**
	 * Determins if the given asset file has a minified version. If enviroment
	 * is not dev, and a minified version exists, it returns the path to the
	 * minified version. Otherwise it returns the full file.
	 *
	 * @param string $assetFile Path to asset file to include
	 * @return string Path to the asset file version to include
	 */
	public function getModuleAssetFile($assetFile) {
		$assetFile	 = str_replace(".min.", ".", $assetFile);
		$ext		 = pathinfo($assetFile, PATHINFO_EXTENSION);
		$minFile	 = preg_replace("/$ext\$/", "min." . $ext, $assetFile);

		$result = (Director::isDev() || !is_file(Director::getAbsFile($minFile))) ?
				$assetFile : $minFile;
		return $result;
	}

}
