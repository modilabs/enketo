<? 	
	require 'elements/html_start.php'; 
?>
		<script type="text/javascript">
			var jrDataStr = <?= $form_data ?>;
		<? if (isset($form_data_to_edit) && isset($return_url)): ?>
			var jrDataStrToEdit = <?= $form_data_to_edit ?>;
			var RETURN_URL = '<?= $return_url ?>';
		<? endif; ?>
		</script>
	
	</head>
	<body>
	<? if (ENVIRONMENT === 'production'){include_once 'elements/tracking.php';}?>
		
		<header style="height: 0;"></header>
			
	<? require 'elements/dialogs.php'; ?>

		<div class="main">
			<article class="paper" >
				<div class="form-header">
					<span class="branding">enketo forms + formhub</span>
					<button onclick="printO.printForm(); return false" class="print"><i class="icon-print"></i></button>
				</div>
				<?= $form ?>
				<button id="submit-edited-data" class="btn btn-primary btn-large" ><i class="icon-ok icon-white"></i> Submit</button>
			</div>
		</article>

		

	<? require 'elements/footer++.php' ?>



