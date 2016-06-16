const getSearchText = (editorState, selection) => {
  const anchorKey = selection.getAnchorKey();
  const anchorOffset = selection.getAnchorOffset() - 1;
  const currentContent = editorState.getCurrentContent();
  const currentBlock = currentContent.getBlockForKey(anchorKey);
  const blockText = currentBlock.getText();

  let lastEntityIndex = 0;

  currentBlock.findEntityRanges(
    character => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null
      );
    },
    (start, end) => {
      lastEntityIndex = end;
    }
  );

  return {
    word: blockText.substr(lastEntityIndex + 1),
    begin: lastEntityIndex > 0 ? lastEntityIndex + 1 : lastEntityIndex,
    end: anchorOffset + 1,
  };
};

export default getSearchText;
