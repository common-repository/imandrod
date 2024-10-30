<?php
/*  Copyright 2012 DouO (email : dourokinga@gmail.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/


/*
Plugin Name: IMAndrod
Plugin URI: http://dourok.info/2012/04/lonely-android/
Description: 当用户没有头像时,就显示一个可爱的Android机器人.
Version: 0.03
Author: Tiou Lims
Author URI: http://dourok.info
*/

//require processing.js
function rw_imandroid() {
	wp_deregister_script('imandroid'); // deregister
	wp_enqueue_script(
		'imandroid',
		plugins_url('/js/imandroid.js', __FILE__),
		array('processing'),
		'0.03'
	);
}
add_action('init', 'rw_imandroid');

function imandroid_get_avatar($avatar, $id_or_email, $size) {
  if(!is_object($id_or_email)||!$id_or_email->comment_author_email){
    return $avatar;
  }
    $email = $id_or_email->comment_author_email;

   $datasrc = plugins_url('/js/imandroid.pjs', __FILE__);
   $old = $avatar;
   $email_hash = md5( strtolower( $email ) );
    $avatar = '<canvas '.
     //'src="'. datasrc . '" ' .
     'width="' . $size . 'px" height="' . $size . 'px"' .
     'class="avatar" id="imandroid-'.$id_or_email->comment_ID .
     //'" title="'.$email_hash.
     '">'.
     '<script type="text/javascript">imandroid_load("imandroid-'.$id_or_email->comment_ID.'","'.$email_hash.'","'.$datasrc.'");</script>'.
     $old .
     '</canvas>';
    return $avatar;
}
add_filter( 'get_avatar', 'imandroid_get_avatar',10, 3 );

?>