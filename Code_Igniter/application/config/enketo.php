<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Configuration file for all settings EXCEPT the database settings
 */

/**
 * These are required for the geopoint widget to work in the forms. 
 * The first is for the Google Maps API v3 (fancy dynamic maps)
 * The second is for the Google Maps Static API (simple read-only maps)
 * Request your own here: https://developers.google.com/maps/signup
 */
$config['google_maps_api_v3_key'] = "";
$config['google_maps_static_api_key'] = "";

/**
 * Leave empty if not using Google Analytics
 */
$config['google_analytics_key'] = "";

/**
 * Used for various purposes, best to fill something in for now
 */
$config['integration_with_url'] = "http://google.com";

/**
 * Will be used to direct users throughout application
 */
$config['support_email'] = "support@formhub.org";

/**
 * In the webform view this is the brand name shown (empty = enketo)
 */
$config['brand'] = "";

/**
 * OpenRosa servers that are allowed to connect
 */
$config['openrosa_domains_allowed'] = array(
	array('url' => '(www\.|dev\.)?formhub\.org\/?(martijnr|formhub_u)?', 'api_token' => 'abcde'),
);

/**
 * **********************************************************
 * It is not recommended to change anything below this line *
 * **********************************************************
 */
$config['integrated'] = strlen($config['integration_with_url']) > 0;
$config['auth_support'] = is_dir(APPPATH.'third_party/form_auth');
$config['account_support'] = is_dir(APPPATH.'third_party/account');