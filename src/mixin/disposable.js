function Disposable(target) {
   if (target.dispose !== undefined) {
       throw '"dispose" method already defined';
   }
   var _disposables = [];

   target.addDisposable = function(disposer) {
       _disposables.push(disposer);
   };

   target.dispose = function() {
       _disposables.forEach(function(dispose) {
           dispose();
       });
   };

   return target;
}

module.exports = {
    mixin: Disposable
};
