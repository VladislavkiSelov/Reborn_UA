export default function ClickLikeAddFavorites({ e, el,reference, user, categoryId ,navigate}) {
    if (e.target.classList.contains('like')) {
      if (!user) {
        const allProducts = JSON.parse(localStorage.getItem('products')) || [];
        const res = allProducts.find(item => item.reference === reference);
        if (res) {
          return;
        }
        const newAllProducts = [...allProducts, el];
        localStorage.setItem('products', JSON.stringify(newAllProducts));
        return;
      }

      if (user) {
        const url = `https://back.komirka.pp.ua/api/v1/private/products/${reference}/favorites`;
        const token = JSON.parse(localStorage.getItem('user')).authenticationToken;

        const fetchDate = async () => {
          await fetch(url, {
            method: 'POST',
            headers: { accept: '*/*', Authorization: `Bearer ${token}` },
          });
        };

        try {
          fetchDate();
        } catch (error) {
          console.error(error);
        }

        return;
      }
    }

    navigate(`/category/${categoryId}/product/${reference}`);
  }