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

class Webform extends CI_Controller {

    private $default_library_scripts = array
    (
        '/libraries/enketo-core/lib/jquery.min.js',
        '/libraries/enketo-core/lib/bootstrap.min.js', 
        '/libraries/enketo-core/lib/bootstrap-timepicker/js/bootstrap-timepicker.js',
        '/libraries/enketo-core/lib/bootstrap-datepicker/js/bootstrap-datepicker.js',
        '/libraries/enketo-core/lib/modernizr.min.js',
        '/libraries/enketo-core/lib/xpath/build/xpathjs_javarosa.min.js',
        '/libraries/FileSaver.min.js',
        '/libraries/BlobBuilder.min.js',
        '/libraries/file-manager/src/files.js'
    );
    private $default_main_scripts = array
        (
            '/js-source/helpers.js',
            '/js-source/gui.js',
            '/libraries/enketo-core/src/js/utils.js',
            '/libraries/enketo-core/src/js/form.js',
            '/libraries/enketo-core/src/js/widgets.js',
            '/js-source/storage.js',
            '/js-source/connection.js',
            '/js-source/survey_controls.js',
            '/js-source/debug.js'
        ); 
    private $default_stylesheets = array
    (
        array( 'href' => '/build/css/webform.css', 'media' => 'all'),
        array( 'href' => '/build/css/webform_print.css', 'media' => 'print')
    );
    private $default_iframe_stylesheets = array
    (
        array( 'href' => '/build/css/webform_iframe.css', 'media' => 'all'),
        array( 'href' => '/build/css/webform_print.css', 'media' => 'print')
    );
    private $credentials = NULL;

    function __construct()
    {
        parent::__construct();
        $this->load->helper(array('subdomain','url', 'form'));
        $this->load->model('Survey_model','',TRUE);
        $sub = get_subdomain();
        $suf = $this->Survey_model->ONLINE_SUBDOMAIN_SUFFIX;
        $this->subdomain = ($this->Survey_model->has_offline_launch_enabled()) 
            ? $sub : substr($sub, 0, strlen($sub) - strlen($suf));
        if (!empty($this->subdomain)) {
            $form_props = $this->Survey_model->get_form_props();
            $this->server_url= (isset($form_props['server_url'])) ? $form_props['server_url'] : NULL;
            $this->form_id = (isset($form_props['form_id'])) ? $form_props['form_id'] : NULL; 
            $this->form_hash_prev = (isset($form_props['hash'])) ? $form_props['hash'] : NULL; 
            $this->media_hash_prev = (isset($form_props['media_hash'])) ? $form_props['media_hash'] : NULL;
            $this->xsl_version_prev = (isset($form_props['xsl_version'])) ? $form_props['xsl_version'] : NULL; 
        }
        $this->iframe = ( $this->input->get('iframe', TRUE) == 'true' );

        if ($this->config->item('auth_support')) {
            $this->load->add_package_path(APPPATH.'third_party/form_auth');
        }
        $this->load->library('form_auth');
        if ($this->config->item('account_support')) {
            $this->load->add_package_path(APPPATH.'third_party/account');
        }
        $this->load->library('account');
        log_message('debug', 'Webform Controller Initialized');
    }

    public function index()
    {   
        if ($this->_subdomain_check_route()) {
            return;
        }
        if ($this->_launched_check_route()) {
            return;
        }
        if ($this->_paywall_check_route()) {
            return;
        }
        $form = $this->_get_form();
        if ($this->_authentication_route($form)) {
            return;
        }
        if ($this->_form_null_check_route($form)) {
            return;
        }
        
        $data = array(
            'manifest'=> ($this->Survey_model->has_offline_launch_enabled()) ? '/manifest/html/webform' : NULL, 
            'title_component' => 'webform', 
            'html_title' => $form->title,
            'form'=> $form->html,
            'form_data'=> $form->default_instance,
            'stylesheets'=> $this->iframe ? $this->default_iframe_stylesheets : $this->default_stylesheets,
            'server_url' => $this->server_url,
            'form_id' => $this->form_id,
            'logo_url' => $this->account->logo_url($this->server_url),
            'logout' => $this->credentials !== NULL
        );

        if (ENVIRONMENT === 'production') {
            $data['scripts'] = array
            (
                //'/libraries/libraries-all-min.js',
                '/build/js/webform.min.js'
            );
        } else {       
            $data['scripts'] = array_merge
            (
                $this->default_library_scripts, 
                array
                (
                    '/js-source/cache.js'
                ),
                $this->default_main_scripts,
                array
                (
                    '/js-source/webform.js'
                )
            );
        }
        $this->load->view('webform_view', $data);
    }

    /**
     * function that opens an edit-view of the form with previously POSTed instance-to-edit 
     * and return url (from OpenRosa server)
     * the edit-view is a simplified webform view without any offline capabilities 
     * (no applicationCache, no localStorage)
     **/
    public function edit()
    {
        $instance_id = $this->input->get('instance_id', TRUE);
        if ($this->_subdomain_check_route()) {
            return;
        }
        if ($this->_launched_check_route()) {
            return;
        }
        if ($this->_paywall_check_route()) {
            return;
        }
        if ($this->_online_only_check_route()) {
            return;
        }
        if (empty($instance_id)) {
            return show_error('No instance provided to edit and/or no return url provided to return to.', 404);
        }
        $edit_obj = $this->_get_edit_obj($instance_id);

        if(!$edit_obj) {
          return show_error("Couldn't find instance for subdomain ". $this->subdomain . " and
              instance id " . $instance_id, 404);
        }

        $form = $this->_get_form();
        if ($this->_authentication_route($form, '/edit?instance_id'.$instance_id )) {
            return;
        }
        if ($this->_form_null_check_route($form)) {
            return;
        }

        $data = array
        (
            'title_component'=>'webform edit', 
            'html_title'=> $form->title,
            'form'=> $form->html,
            'form_data'=> $form->default_instance,
            'form_data_to_edit' => $edit_obj->instance_xml,
            'return_url' => $edit_obj->return_url,
            'logo_url' => $this->account->logo_url($this->server_url),
            'stylesheets'=> $this->iframe ? array(
                array( 'href' => '/build/css/webform_edit_iframe.css', 'media' => 'all'),
                array( 'href' => '/build/css/webform_print.css', 'media' => 'print')
            ) : $this->default_stylesheets
        );

        if (ENVIRONMENT === 'production') {
            $data['scripts'] = array
            (
                //'/libraries/libraries-all-min.js',
                '/build/js/webform-edit.min.js'
            );
        } else {       
            $data['scripts'] = array_merge(
                $this->default_library_scripts,
                $this->default_main_scripts,
                array
                (
                    '/js-source/webform_edit.js'
                )
            );
        }
        $this->load->view('webform_view', $data);
    }

    /**
     * function that opens an iframeable-view of the form which is a simplified webform view 
     * without any offline capabilities 
     * (no applicationCache, no localStorage)
     * @deprecated
     **/
    public function iframe()
    {
        $this->default_stylesheets = $this->default_iframe_stylesheets;
        return $this->single();
    }

    /**
     * single submit view (SurveyMonkey watch out. Enketo is coming to get you!)
     */
    public function single()
    {
        if ($this->_subdomain_check_route()) {
            return;
        }
        if ($this->_launched_check_route()) {
            return;
        }
        if ($this->_paywall_check_route()) {
            return;
        }
        if ($this->_online_only_check_route()) {
            return;
        }
        $form = $this->_get_form();
        if ($this->_authentication_route($form, '/single')) {
            return;
        }
        if ($this->_form_null_check_route($form)) {
            return;
        }
    
        $data = array
        (
            'title_component'=>'webform single-submit', 
            'html_title'=> $form->title,
            'form'=> $form->html,
            'form_data'=> $form->default_instance,
            'form_data_to_edit' => NULL,
            'return_url' => '/webform/thanks',
            'stylesheets'=> $this->iframe ? $this->default_iframe_stylesheets : $this->default_stylesheets,
            'logo_url' => $this->account->logo_url($this->server_url),
            'logout' => $this->credentials !== NULL
        );

        if (ENVIRONMENT === 'production') {
            $data['scripts'] = array
            (
                //'/libraries/libraries-all-min.js',
                '/build/js/webform-single.min.js'
            );
        } else {       
            $data['scripts'] = array_merge
            (
                $this->default_library_scripts,
                $this->default_main_scripts,
                array
                (
                    '/js-source/webform_single.js'
                )
            );
        }
        $this->load->view('webform_view',$data);
    }

    public function preview()
    {
        $params = $this->input->get(NULL, TRUE);

        if (!$params || ( empty($params['form']) && (empty($params['server']) || empty($params['id']))) ) {
            show_error('Preview requires server url and form id variables or a form url variable.', 404);
            return;
        }
        if (isset($this->subdomain)) {
            show_error('Preview cannot be launched from subdomain', 404);
            return;
        }
        $data = array
        (
            'title_component' => 'webform preview', 
            'html_title'=> 'enketo webform preview',
            'form'=> '',
            'return_url' => NULL,
            'stylesheets'=> $this->iframe ? $this->default_iframe_stylesheets : $this->default_stylesheets,
            'logo_url' => !empty($params['server']) ? $this->account->logo_url($params['server']) : $this->account->logo_url(),
            'logout' => $this->credentials !== NULL
        );
        if (ENVIRONMENT === 'production') {
            $data['scripts'] = array
            (
                //'/libraries/libraries-all-min.js',
                '/build/js/webform-preview.min.js'
            );
        } else {       
            $data['scripts'] = array_merge
            (
                $this->default_library_scripts,
                $this->default_main_scripts,
                array
                (
                    '/js-source/webform_preview.js'
                )
            );
        }
        $this->load->view('webform_preview_view', $data);
    }

    public function thanks()
    {
        $this->load->view('thanks_view', array(
            'scripts' => array(),
            'stylesheets' => $this->default_stylesheets
        ));
    }

    private function _login($append='')
    {
        $this->session->set_flashdata(
            array('server_url' => $this->server_url, 'form_id' => $this->form_id, 'return_url' => full_base_url().'webform'.$append)
        );
        redirect('/authenticate/login');
    }

    private function _get_form()
    {
        if (!isset($this->form_id) || !isset($this->server_url)) {
            log_message('error', 'no form_id and/or server_url');
            return FALSE;
        }
        
        $this->load->model('Form_model', '', TRUE);
        $this->credentials = $this->form_auth->get_credentials();
        $this->Form_model->setup($this->server_url, $this->form_id, $this->credentials, $this->form_hash_prev, $this->xsl_version_prev, $this->media_hash_prev);
        
        if($this->Form_model->requires_auth()) {
            log_message('debug', "AUTHENTICATION REQUIRED");
            $form = new stdClass();
            $form->authenticate = TRUE;
            return $form;
        }

        if($this->Form_model->can_be_loaded_from_cache()) {
            //log_message('debug', 'unchanged form and stylesheets, loading transformation result from database');
            $form = $this->Survey_model->get_cached_transform_result();

            if (empty($form->title) || empty($form->html) || empty($form->default_instance))
            {
                log_message('error', 'failed to obtain transformation result from database for '.$this->subdomain);
            }
        } else {
            log_message('debug', 'form changed, form media changed, xslt stylesheets changed or form never transformed before, going to perform transformation');
            $form = $this->Form_model->get_transform_result_obj();
            if (!empty($form->html) && !empty($form->default_instance))
            {
                $this->Survey_model->update_transform_result($form);
            }
        }
        
        if (!empty($form->html) && !empty($form->default_instance)) {
            return $form;
        }
        return NULL;
    }

    private function _get_edit_obj($instance_id)
    {
        $this->load->model('Instance_model','',TRUE);
        $edit_o = $this->Instance_model->get_instance($this->subdomain, $instance_id);
        if (!empty($edit_o)) {
            $edit_o->instance_xml = json_encode($edit_o->instance_xml);
        }
        return (!empty($edit_o->instance_xml) && !empty($edit_o->return_url)) ? $edit_o : NULL;
    }

    private function _subdomain_check_route()
    {
        if (!isset($this->subdomain)) {
            show_error('View should be launched from survey subdomain', 404);
            return TRUE;
        }
        return FALSE;
    }

    private function _launched_check_route()
    {
        if (!$this->Survey_model->is_launched_survey()) {
            show_error('This survey has not been launched in enketo or is no longer active.', 404);
            return TRUE;
        }
        return FALSE;
    }

    private function _online_only_check_route()
    {
        if ($this->Survey_model->has_offline_launch_enabled()) {
            show_error('The iframe view can only be launched in online-only mode', 404);
            return TRUE;
        }
        return FALSE;
    }

    private function _authentication_route($form, $append='')
    {
        if (isset($form->authenticate) && $form->authenticate) {
            if ($this->input->get('manifest') == 'true') {
                $this->output->set_output('');
            } else {
                $this->_login($append);
            }
            return TRUE;
        }
        return FALSE;
    }

    private function _paywall_check_route()
    {
        if (!$this->account->serve_allowed($this->server_url)) {
            $this->load->view('unpaid_view');
            return TRUE;
        }
        return FALSE;
    }

    private function _form_null_check_route($form)
    {
        if ($form === NULL) {
            log_message('error', 'Form could not be found or transformed');
            show_error('Form not reachable (or an error occurred during transformation). ', 404);
            return TRUE;
        }
        return FALSE;
    }
}
?>