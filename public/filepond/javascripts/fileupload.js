const rootStyles = window.getComputedStyle( document.documentElement )

if( rootStyles.getPropertyValue( '--book-cover-width-large' ) != null &&
   rootStyles.getPropertyValue( '--book-cover-width-large' ) !== '' ){
  ready()
}else{
  document.getElementById('main-css').addEventListener('load', ready)
}

function ready(){

  const coverWidth = parseFloat( rootStyles.getPropertyValue( '--book-cover-width-large' ))
  const coverAspectRatio = parseFloat(rootStyles.getPropertyValue( '--book-cover-aspect-ratio' ))
  const coverHeight = coverWidth / coverAspectRatio

  // Register the plugin
FilePond.registerPlugin(FilePondPluginImagePreview);
FilePond.registerPlugin(FilePondPluginImageResize);
FilePond.registerPlugin(FilePondPluginFileEncode);

// set aspect ratio
FilePond.setOptions({
    stylePanelAspectRatio: 1 / coverAspectRatio,
    imageResizeTargetHeight: coverHeight,
    imageResizeTargetWidth: coverWidth
})

// Turn all file input elements into ponds 
  FilePond.parse(document.body);


}

