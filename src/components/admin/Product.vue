<script>
import axios from 'axios';


export default {
  name: 'product',
  data() {
  return {
    products: [],
    newProduct: {
      product_cat: '',
      product_name: '',
      product_price: 0,
      product_image: ''
    },
    isCreateModalOpen: false,
    editingProductId: null, // เพิ่มตัวแปรสำหรับเก็บรหัสสินค้าที่ต้องการแก้ไข
    editingProduct: {  // กำหนดเป็นออบเจกต์ที่มีค่าว่างให้กับ editingProduct
      product_id: null,
      product_cat: '',
      product_name: '',
      product_price: 0,
      product_image: ''
    },
    editingProductImage: null, // เพิ่มตัวแปรสำหรับเก็บข้อมูลภาพสินค้าเดิมที่ต้องการแก้ไข
  };
},

  created() {
      this.fetchProducts();
 
  },
  
  methods: {
    async fetchProducts() {
      try {
        const token = localStorage.getItem('Token');
        const response = await axios.get('http://26.125.18.207:8000/Product', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        // console.log(response.data)
        this.products = response.data;
        // storedProducts = response.data;
      } catch (error) {
        console.log('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:', error);
      }
    },

    handleFileChange(event) {
    const file = event.target.files[0];
    // ดำเนินการกับไฟล์ที่เลือกได้ตามต้องการ
    this.newProduct.product_image = file;
  },

  handleEditFileChange(event) {
  const file = event.target.files[0];
  this.editingProduct.product_image = file;
  this.editingProductImage = null; // เมื่อมีการเลือกภาพใหม่ให้เคลียร์ข้อมูลภาพเก่า
},


  formatPrice(price) {
    if (price === undefined || price === null || isNaN(price)) {
      return 'ไม่มีข้อมูล';
    }
    return Number(price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

    async addProduct() {
      try {
        const token = localStorage.getItem('Token');
        const formData = new FormData()
        formData.append('product_cat', this.newProduct.product_cat);
      formData.append('product_name', this.newProduct.product_name);
      formData.append('product_price', parseFloat(this.newProduct.product_price).toFixed(2));
      formData.append('product_image', this.newProduct.product_image);
        const response = await axios.post('http://26.125.18.207:8000/Product', formData,  {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
        this.products.push(response.data);
        this.newProduct = {
          product_cat: '',
          product_name: '',
          product_price: null,
          product_image: null
        };
        await this.fetchProducts();

      } catch (error) {
        console.log('เกิดข้อผิดพลาดในการเพิ่มสินค้า:', error);

      }
    },

    openEditProductModal(product) {
      // console.log(product)
  if (product) {
    // this.isEditModalOpen = true;
    this.editingProductId = product.product_id;
    this.editingProduct = {
      product_id: product.product_id,
      product_cat: product.product_cat,
      product_name: product.product_name,
      product_price: product.product_price,
      product_image: product.product_image
    };
    this.editingProductImage = product.product_image;
  }
},

async editProduct(productId) {
  console.log(productId)
  try {
    const token = localStorage.getItem('Token');
    const formData = new FormData();
    formData.append('product_cat', this.editingProduct.product_cat);
    formData.append('product_name', this.editingProduct.product_name);
    formData.append('product_price', parseFloat(this.editingProduct.product_price).toFixed(2));
    if (this.editingProductImage !== this.editingProduct.product_image) {
      formData.append('product_image', this.editingProduct.product_image);
    }


    const response = await axios.put(`http://26.125.18.207:8000/Product/${productId}`, formData, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log(response.data);

    // ทำการอัปเดตข้อมูลสินค้าในตาราง
    const index = this.products.findIndex(product => product.product_id === productId);
    if (index !== -1) {
      this.products[index] = response.data;
    }
    this.editingProduct = {
      product_cat: '',
      product_name: '',
      product_price: 0,
      product_image: null
    };
    this.editingProductId = null;
    this.editingProductImage = null;
    // document.getElementById('EditModal').style.display = 'block';
    // await this.fetchProducts();
  } catch (error) {
    console.log('เกิดข้อผิดพลาดในการแก้ไขสินค้า:', error);
  }
},


async deleteProduct(productId) {
  try {
    const token = localStorage.getItem('Token');
    const response = await axios.delete(`http://26.125.18.207:8000/Product/${productId}/Delete`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });
    console.log(response.data);
    // หลังจากลบสินค้าแล้วให้ทำการดึงข้อมูลสินค้าใหม่
    await this.fetchProducts();
  } catch (error) {
    console.log('เกิดข้อผิดพลาดในการลบสินค้า:', error);
  }
}
},
  
  }

</script>

<template>
  <div class=" d-flex justify-content-between mt-3 " >
    <div class="d-flex col-11 justify-content-center "  >
      <h3 class="d-flex mb-0 ">หน้าสินค้า</h3>
    </div>
    <div class="d-flex col-1">
      <button class="btn text-white" style="background-color:#3F2305; width: 120px;"  data-bs-toggle="modal" data-bs-target="#CreateModal">เพิ่มข้อมูล</button>
    </div>
  </div>


  <!-- Modal เพิ่มสินค้า -->

  <div class="modal fade" id="CreateModal"   tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class=" d-flex mt-3    ">
        <div class="col-10 ps-5 ">
          <h5 class=" text-center  ">เพิ่มสินค้าใหม่</h5>
        </div>
        <div class="col-2  justify-content-center text-center  " >
          <button type="button" class="btn btn-close w-1" data-bs-dismiss="modal" aria-label="Close">
            </button>
        </div>
          
          </div>
 
          <div class="modal-body">
         <form @submit.prevent="addProduct">
           <div class="form-group">
             <label for="productCat">ประเภทสินค้า</label>
             <input type="text" class="form-control" id="productCat" v-model="newProduct.product_cat" required>
           </div>
           <div class="form-group">
             <label for="productName">ชื่อสินค้า</label>
             <input type="text" class="form-control" id="productName" v-model="newProduct.product_name" required>
           </div>
           <div class="form-group">
             <label for="productPrice">ราคาสินค้า</label>
             <input type="number" class="form-control" id="productPrice" v-model="newProduct.product_price" step="0.01" required>
           </div>
           <div class="form-group">
             <label for="productImage">รูปภาพสินค้า</label>
             <input type="file" class="form-control" id="productImage" ref="editProductImageRef"  @change="handleFileChange" required>
           </div>
           <div class="d-flex justify-content-center mt-5 ">
             <button type="submit" class="btn  text-white " style="background-color:#3F2305; width: 120px;"  >เพิ่มสินค้า</button>
           </div>
         </form>
       </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal แก้ไขสินค้า -->
<div class="modal fade" id="EditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class=" d-flex mt-3    ">
        <div class="col-10 ps-5 ">
          <h5 class=" text-center  ">แก้ไขสินค้า</h5>
        </div>
        <div class="col-2  justify-content-center text-center  " >
          <button type="button" class="btn btn-close w-1" data-bs-dismiss="modal" aria-label="Close">
            </button>
        </div>
          
          </div>
  
      <div class="modal-body">
        <template v-if="editingProduct">
          <form @submit.prevent="editProduct(editingProductId)">
    <div class="form-group">
      <label for="editProductCat">ประเภทสินค้า</label>
      <input type="text" class="form-control" id="editProductCat" v-model="editingProduct.product_cat" required>
    </div>
    <div class="form-group">
      <label for="editProductName">ชื่อสินค้า</label>
      <input type="text" class="form-control" id="editProductName" v-model="editingProduct.product_name" required>
    </div>
    <div class="form-group">
      <label for="editProductPrice">ราคาสินค้า</label>
      <input type="number" class="form-control" id="editProductPrice" v-model="editingProduct.product_price" step="0.01" required>
    </div>
    <div class="form-group">
      <label for="editProductImage">รูปภาพสินค้า</label>
      <input type="file" class="form-control" id="editProductImage" @change="handleEditFileChange">
    </div>
    <div class="d-flex justify-content-center mt-5 ">
      <button type="submit" class="btn  text-white " style="background-color:#3F2305; width: 120px;"  data-bs-dismiss="modal">บันทึก</button>
    </div>
  </form>
    </template>
    <template v-else>
      <p>ไม่มีข้อมูลสินค้าที่ต้องการแก้ไข</p>
    </template>
  
</div>

    </div>
  </div>
</div>




  <!-- ตารางสินค้า -->
  <div class="mt-3">
    <table class="table table-striped table-bordered table-sm  table-light shadow-sm"  >
      <thead >
        <tr >
          <th scope="col" class="text-center align-middle col-1" style="background-color:#3F2305 ; color: white;">รหัสสินค้า</th>
          <th scope="col" class="text-center align-middle  col-2" style="background-color:#3F2305 ; color: white;">ประเภทสินค้า</th>
          <th scope="col" class="text-center align-middle  col-2" style="background-color:#3F2305 ; color: white;">ชื่อสินค้า</th>
          <th scope="col" class="text-center align-middle  col-1" style="background-color:#3F2305 ; color: white;">ราคาสินค้า</th>
          <th scope="col" class="text-center align-middle  col-1" style="background-color:#3F2305 ; color: white;">รูปภาพสินค้า</th>
          <th scope="col" class="text-center align-middle  col-1" style="background-color:#3F2305 ; color: white;">แก้ไข</th>
          <th scope="col" class="text-center align-middle  col-1" style="background-color:#3F2305 ; color: white;">ลบ</th>
        </tr>
      </thead>
      <tbody>
  <tr v-for="product in products" :key="product.product_id">
    <td class="text-center align-middle">{{ product.product_id }}</td>
    <td class="align-middle">{{ product.product_cat || '-' }}</td>
    <td class="align-middle">{{ product.product_name || '-' }}</td>
    <td class="text-center align-middle">{{ formatPrice(product.product_price) || '-' }}</td>
    <td class="text-center align-middle">
    <img v-if="product.product_image" :src="`http://26.125.18.207:8000${product.product_image}`"  alt="Product Image" style="max-width: 100px; max-height: 100px;">
    <span v-else>No Image</span>
  </td>
    <td class="text-center align-middle fs-3"><i class="bi bi-pencil-square" type="button" style="color: #CAC403;"  data-bs-toggle="modal" data-bs-target="#EditModal" @click="openEditProductModal(product)" ></i></td>
    <td class="text-center align-middle fs-3"><i class="bi bi-trash3-fill" type="button" style="color: red;" @click="deleteProduct(product.product_id)"></i></td>
  </tr>
</tbody>
    </table>
  </div>
</template>

<style>
</style>
