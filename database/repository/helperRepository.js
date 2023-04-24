class HelperRepository {
  selectManyMergeJoinedTables({
    results,
    parentTableName,
    primaryKeyName,
    childTableName,
    childTableNickname,
    foreignKeyName,
  }) {
    let nestedResult = [];

    // Extract Parents
    for (const result of results) {
      if (
        !nestedResult.some(
          (res) =>
            res[primaryKeyName] === result[parentTableName][primaryKeyName]
        )
      ) {
        nestedResult.push({
          ...result[parentTableName],
          [childTableNickname]: [],
        });
      }
    }

    // Match Parents With childs
    for (const parent of nestedResult) {
      for (const result of results) {
        if (result[childTableName][foreignKeyName] === parent[primaryKeyName]) {
          parent[childTableNickname].push(result[childTableName]);
        }
      }
    }

    return nestedResult;
  }
}

module.exports = HelperRepository;
