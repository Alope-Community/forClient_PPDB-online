<?php

namespace App\Services;

class HuffmanService
{
   private $frequencies = [];
   private $huffmanTree = null;
   private $huffmanCodes = [];
   private $buffer = null;

   // public function compressImage($imagePath)
   // {
   //    if (!file_exists($imagePath)) {
   //       return false;
   //    }

   //    $image = imagecreatefromjpeg($imagePath);
   //    if (!$image) {
   //       return false;
   //    }

   //    $this->buffer = $image;

   //    $width = imagesx($image);
   //    $height = imagesy($image);

   //    $samplePixels = [];
   //    for ($i = 0; $i < 1000; $i++) {
   //       $x = rand(0, $width - 1);
   //       $y = rand(0, $height - 1);
   //       $rgb = imagecolorat($image, $x, $y);

   //       $r = ($rgb >> 16) & 0xFF;
   //       $g = ($rgb >> 8) & 0xFF;
   //       $b = $rgb & 0xFF;
   //       $a = ($rgb >> 24) & 0x7F;

   //       $samplePixels[] = ['r' => $r, 'g' => $g, 'b' => $b, 'a' => 127 - $a];
   //    }

   //    $this->calculateFrequencies($samplePixels);
   //    $this->buildHuffmanTree();
   //    $this->generateHuffmanCodes($this->huffmanTree);

   //    $resized = imagecreatetruecolor($width, $height);
   //    imagecopyresampled($resized, $image, 0, 0, 0, 0, $width, $height, $width, $height);

   //    $bufferWidth = 200;
   //    $bufferHeight = 200;

   //    imagejpeg($resized, $imagePath, 10);

   //    imagedestroy($image);
   //    imagedestroy($resized);

   //    return true;
   // }
    public function compressImage($imagePath, ?float &$elapsed = null)
    {
      $t0 = microtime(true); // Start timer

      if (!file_exists($imagePath)) {
         return false;
      }

      $image = imagecreatefromjpeg($imagePath);
      if (!$image) {
         return false;
      }

      $this->buffer = $image;

      $width = imagesx($image);
      $height = imagesy($image);

      $samplePixels = [];
      for ($i = 0; $i < 1000; $i++) {
         $x = rand(0, $width - 1);
         $y = rand(0, $height - 1);
         $rgb = imagecolorat($image, $x, $y);

         $r = ($rgb >> 16) & 0xFF;
         $g = ($rgb >> 8) & 0xFF;
         $b = $rgb & 0xFF;
         $a = ($rgb >> 24) & 0x7F;

         $samplePixels[] = ['r' => $r, 'g' => $g, 'b' => $b, 'a' => 127 - $a];
      }

      $this->calculateFrequencies($samplePixels);
      $this->buildHuffmanTree();
      $this->generateHuffmanCodes($this->huffmanTree);

      $resized = imagecreatetruecolor($width, $height);
      imagecopyresampled($resized, $image, 0, 0, 0, 0, $width, $height, $width, $height);

      imagejpeg($resized, $imagePath, 10);

      imagedestroy($image);
      imagedestroy($resized);

      $elapsed = microtime(true) - $t0;

      return true;
   }

   public function decompressImage($imagePath)
   {
      if (!file_exists($imagePath)) {
         return false;
      }

      $image = imagecreatefromjpeg($imagePath);
      if (!$image) {
         return false;
      }

      ob_start();
      imagejpeg($image, null, 85);
      $imageData = ob_get_clean();

      $sample = substr($imageData, 0, 1024);
      $sampleBase64 = base64_encode($sample);

      imagedestroy($image);

      return true;
   }

   private function calculateFrequencies($pixels)
   {
      $this->frequencies = array_fill(0, 256, 0);

      foreach ($pixels as $pixel) {
         $this->frequencies[$pixel['r']]++;
         $this->frequencies[$pixel['g']]++;
         $this->frequencies[$pixel['b']]++;
      }
   }

   private function buildHuffmanTree()
   {
      $queue = new \SplPriorityQueue();

      $topValues = [];
      for ($i = 0; $i < 256; $i++) {
         if ($this->frequencies[$i] > 0) {
            $topValues[$i] = $this->frequencies[$i];
            if (count($topValues) >= 10) {
               break;
            }
         }
      }

      arsort($topValues);
      $topValues = array_slice($topValues, 0, 10, true);

      foreach ($topValues as $value => $freq) {
         $queue->insert(
            ['value' => $value, 'freq' => $freq, 'left' => null, 'right' => null],
            -$freq
         );
      }

      if ($queue->count() == 0) {
         $this->huffmanTree = null;
         return;
      }

      if ($queue->count() == 1) {
         $this->huffmanTree = $queue->extract();
         return;
      }

      while ($queue->count() > 1) {
         $left = $queue->extract();
         $right = $queue->extract();

         $queue->insert(
            [
               'value' => null,
               'freq' => $left['freq'] + $right['freq'],
               'left' => $left,
               'right' => $right
            ],
            - ($left['freq'] + $right['freq'])
         );
      }

      $this->huffmanTree = $queue->extract();
   }

   private function generateHuffmanCodes($node, $code = '')
   {
      if ($node === null) {
         return;
      }

      if ($node['value'] !== null) {
         $this->huffmanCodes[$node['value']] = $code ?: '0';
         return;
      }

      if (strlen($code) < 5) {
         $this->generateHuffmanCodes($node['left'], $code . '0');
         $this->generateHuffmanCodes($node['right'], $code . '1');
      }
   }
}
