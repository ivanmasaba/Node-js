// Register the plugin
FilePond.registerPlugin(FilePondPluginImagePreview);
FilePond.registerPlugin(FilePondPluginImageResize);
FilePond.registerPlugin(FilePondPluginFileEncode);

// set aspect ratio
FilePond.setOptions({
    stylePanelAspectRatio: 150 / 100,
    imageResizeTargetHeight: 150,
    imageResizeTargetWidth: 100
})

// Turn all file input elements into ponds 
  FilePond.parse(document.body);
