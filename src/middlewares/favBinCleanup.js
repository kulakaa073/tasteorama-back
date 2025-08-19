export const favBinCleanup = async (doc) => {
  if (doc && doc.delRecipeId) {
    const FavouriteCollection = this.model('favourites');
    const FavRecycleBinCollection = this.model('favRecycleBin');

    const count = await FavouriteCollection.countDocuments({
      delRecipeId: doc.delRecipeId,
    });

    if (count === 0) {
      await FavRecycleBinCollection.findByIdAndDelete(doc.delRecipeId);
    }
  }
};
