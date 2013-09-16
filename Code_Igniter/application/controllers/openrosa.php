<?php

/**
 * Copyright 2012 Martijn van de Rijdt
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class Openrosa extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		if (!empty($subdomain)) {
			log_message('debug', 'front controller loaded with subdomain: '.$subdomain.' -> sending 404');
			show_404();
		}
	}

	public function index()
	{
		$data = array(
			'offline'			=> FALSE, 
			'title_component'	=> '', 
			'robots'			=>	TRUE,
			'stylesheets'		=>	array( 
				array('href' => '/build/css/private/openrosa.css', 'media' => 'screen')
			)
		);
		$this->load->view('private_views/openrosa_intro_view', $data);
	}
}
?>