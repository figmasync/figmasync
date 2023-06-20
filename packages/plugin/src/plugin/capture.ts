export interface ExportableBytes {
  name: string;
  setting: ExportSettingsImage | ExportSettingsPDF | ExportSettingsSVG;
  bytes: Uint8Array;
}

const capture = async (nodes: PageNode) => {
  const { selection } = nodes;
  if (!selection || selection.length === 0) {
    figma?.notify("Please select at least one node");
    return;
  }
  const bytesArray: any[] = [];
  await Promise.all(
    selection?.map(async (node) => {
      let { name, exportSettings } = node;
      if (exportSettings?.length === 0) {
        exportSettings = [
          {
            format: "PNG",
            suffix: "",
            constraint: { type: "SCALE", value: 1 },
            contentsOnly: true,
          },
        ];
      }
      for (let setting of exportSettings) {
        let defaultSetting = setting;
        const bytes = await node.exportAsync(defaultSetting);
        bytesArray.push({
          name,
          setting,
          bytes,
        });
      }
    })
  );
  figma?.ui?.postMessage({
    type: "capture-bytes-success",
    bytesArray,
  });
};

export { capture };
