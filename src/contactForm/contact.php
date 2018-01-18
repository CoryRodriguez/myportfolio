
<?php include('form_process.php'); ?>
<form method="post" action="<?= $_SERVER['PHP_SELF']; ?>">
    <h2 class="text-center py-3">Contact Me</h2>
    <div class="form-group has-success has-feedback">
        <input class="form-control" type="text" name="name" placeholder="Name" /><i class="form-control-feedback glyphicon glyphicon-ok" aria-hidden="true"></i></div>
    <div class="form-group has-error has-feedback">
        <input class="form-control" type="text" name="email" placeholder="Email" /><i class="form-control-feedback glyphicon glyphicon-remove" aria-hidden="true"></i>
       <!--  <p class="help-block">Please enter a correct email address.</p> -->
    </div>
    <div class="form-group">
        <textarea class="form-control" rows="14" name="message" placeholder="Message"></textarea>
    </div>
    <div class="form-group">
    	<button class="btn btn-success px-5" type="submit">Send</button>
    	<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    </div>
</form>