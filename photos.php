<?php
  echo json_encode(explode("\n",shell_exec('curl -0 http://www.flickr.com/explore/interesting/7days/ | grep "pc_img" | sed s/.*src=\"// | sed s/\".*//')));
?>
