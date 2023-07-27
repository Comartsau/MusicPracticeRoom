<script>
import axios from 'axios';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


export default {
  name: 'promotion',
  data() {
  return {
    promotions: [],
    newPromotion: {
      promotion_name: '', 
      promotion_rate_discount: '', 
      promotion_status_start: '', 
      promotion_status_expire: '', 

      },
    editingPromotionId: null, 
    editingPromotion: {  
      promotion_name: '', 
      promotion_rate_discount: '', 
      promotion_status_start: '', 
      promotion_status_expire: '', 
    },
  };
},
components: {
  VueDatePicker,
  },

  created() {
      this.fetchPromotions();
  },
  
  methods: {
    async fetchPromotions() {
      try {
        const token = localStorage.getItem('Token');
        const response = await axios.get('http://26.125.18.207:8000/Promotions', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        console.log(response.data)
        this.promotions = response.data;
        // storedProducts = response.data;
      } catch (error) {
        console.log('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:', error);
      }
    },

    async addPromotion() {
      try {
    const token = localStorage.getItem('Token');
    const data = this.newPromotion;

    console.log(data);

    const response = await axios.post('http://26.125.18.207:8000/Promotions', data, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    });
    console.log(response.data);
    this.promotions.push(response.data);
    this.newPromotion = {
      promotion_name: '',
      promotion_rate_discount: '',
      promotion_status_start: '',
      promotion_status_expire: '',
    };
    await this.fetchPromotions();
  } catch (error) {
    console.log('เกิดข้อผิดพลาดในการเพิ่มโปรโมชั่น:', error);
  }
    },

    openEditPromotionModal(promotion) {
      console.log(promotion)
  if (promotion) {
    this.editingPromotionId = promotion.promotion_id;
    this.editingPromotion = {
      promotion_name: promotion.promotion_name,
      promotion_rate_discount: promotion.promotion_rate_discount,
      promotion_status_start: promotion.promotion_status_start,
      promotion_status_expire: promotion.promotion_status_expire,
    };
  }
},

async editPromotion(promotionId) {
  console.log(promotionId)
  try {
    const token = localStorage.getItem('Token');
    const data = this.editingPromotion
    console.log(data)

    const response = await axios.put(`http://26.125.18.207:8000/Promotions/${promotionId}`, data, {
      headers: {
        'Authorization': `Token ${token}`,
        // 'Content-Type': 'multipart/form-data'
      }
    });

    console.log(response.data);

    // ทำการอัปเดตข้อมูลสินค้าในตาราง
    const index = this.promotions.findIndex(promotion => promotion.promotion_id == promotionId);
    if (index !== -1) {
      this.promotions[index] = response.data;
    }
    this.editingPromotion = {
      promotion_name: '', 
      promotion_rate_discount: '', 
      promotion_status_start: '', 
      promotion_status_expire: '', 
    };
    this.editingRoomId = null;
    await this.fetchPromotions();
  } catch (error) {
    console.log('เกิดข้อผิดพลาดในการแก้ไขสินค้า:', error);
  }
},

async deletePromotion(promotionId) {
  console.log(promotionId)
  try {
    const token = localStorage.getItem('Token');
    const response = await axios.delete(`http://26.125.18.207:8000/Promotions/${promotionId}/Delete`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });
    console.log(response.data);
    // หลังจากลบสินค้าแล้วให้ทำการดึงข้อมูลสินค้าใหม่
    await this.fetchPromotions();
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
      <h3 class="d-flex mb-0 ">หน้าโปรโมชั่น</h3>
    </div>
    <div class="d-flex col-1 ">
      <button class="btn text-white" style="background-color:#3F2305; width: 120px;"  data-bs-toggle="modal" data-bs-target="#CreateModal">เพิ่มข้อมูล</button>
    </div>
  </div>

  <!-- Modal เพิ่มโปรโมชั่น -->
  <div class="modal fade" id="CreateModal"   tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class=" d-flex mt-3   ">
        <div class="col-10 ps-5 ">
          <h5 class=" text-center  ">เพิ่มโปรโมชั่น</h5>
        </div>
        <div class="col-2  justify-content-center text-center  " >
          <button type="button" class="btn btn-close w-1" data-bs-dismiss="modal" aria-label="Close">
            </button>
        </div> 
          </div>
          <div class="modal-body">
         <form @submit.prevent="addPromotion">
          <div class="d-flex justify-content-between">
            <div class="col-5">
              <div class="form-group">
             <label for="productName">ชื่อโปรโมชั่น</label>
             <input type="text" class="form-control" id="productName" v-model="newPromotion.promotion_name"  required>
           </div>
              <div class="form-group">
             <label for="productName">ส่วนลด</label>
             <input type="text" class="form-control" id="productName" v-model="newPromotion.promotion_rate_discount"  required>
           </div>

            </div>
            <div class="col-5">
              <div class="form-group">
             <label for="productName">วันเริ่มต้น</label>
             <VueDatePicker 
          id="promotionStartDate"
          v-model="newPromotion.promotion_status_start"
          required
        ></VueDatePicker>
           </div>
              <div class="form-group">
             <label for="productName">วันหมดอายุ</label>
             <VueDatePicker 
          id="promotionEndDate"
          v-model="newPromotion.promotion_status_expire"
          required
        ></VueDatePicker>
           </div>

            </div>

          </div>
        
     
           <div class="d-flex justify-content-center mt-5 ">
             <button type="submit" class="btn  text-white " style="background-color:#3F2305; width: 120px;" >เพิ่มโปรโมชั่น</button>
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
      <div class=" d-flex mt-3   ">
        <div class="col-10 ps-5 ">
          <h5 class=" text-center  ">แก้ไขโปรโมชั่น</h5>
        </div>
        <div class="col-2  justify-content-center text-center  " >
          <button type="button" class="btn btn-close w-1" data-bs-dismiss="modal" aria-label="Close">
            </button>
        </div> 
          </div>
          <div class="modal-body">
         <form @submit.prevent="editPromotion(editingPromotionId)">
          <div class="d-flex justify-content-between">
            <div class="col-5">
              <div class="form-group">
             <label for="productName">ชื่อโปรโมชั่น</label>
             <input type="text" class="form-control" id="productName" v-model="editingPromotion.promotion_name"  required>
           </div>
              <div class="form-group">
             <label for="productName">ส่วนลด</label>
             <input type="text" class="form-control" id="productName" v-model="editingPromotion.promotion_rate_discount"  required>
           </div>

            </div>
            <div class="col-5">
              <div class="form-group">
             <label for="productName">วันเริ่มต้น</label>
             <VueDatePicker 
          id="promotionStartDate"
          v-model="editingPromotion.promotion_status_start"
          required
        ></VueDatePicker>
           </div>
              <div class="form-group">
             <label for="productName">วันหมดอายุ</label>
             <VueDatePicker 
          id="promotionEndDate"
          v-model="editingPromotion.promotion_status_expire"
          required
        ></VueDatePicker>
           </div>

            </div>

          </div>
        
     
           <div class="d-flex justify-content-center mt-5 ">
             <button type="submit" class="btn  text-white " style="background-color:#3F2305; width: 120px;" data-bs-dismiss="modal" >บันทึก</button>
           </div>
         </form>
       </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

  <!-- ตารางสินค้า -->
  <div class="mt-3">
    <table class="table table-striped table-bordered table-sm  table-light shadow-sm"  >
      <thead >
        <tr >
          <th scope="col" class="text-center align-middle col-1" style="background-color:#3F2305 ; color: white;">ลำดับ</th>
          <th scope="col" class="text-center align-middle  col-2" style="background-color:#3F2305 ; color: white;">ชื่อโปรโมชั่น</th>
          <th scope="col" class="text-center align-middle  col-2" style="background-color:#3F2305 ; color: white;">วันเริ่มต้น</th>
          <th scope="col" class="text-center align-middle  col-2" style="background-color:#3F2305 ; color: white;">วันหมดอายุ</th>
          <th scope="col" class="text-center align-middle  col-2" style="background-color:#3F2305 ; color: white;">ส่วนลด</th>
          <th scope="col" class="text-center align-middle  col-1" style="background-color:#3F2305 ; color: white;">แก้ไข</th>
          <th scope="col" class="text-center align-middle  col-1" style="background-color:#3F2305 ; color: white;">ลบ</th>
        </tr>
      </thead>
      <tbody>
  <tr v-for="promotion in promotions" :key="promotion.promotion_id">
    <td class="text-center align-middle">{{ promotion.promotion_id }}</td>
    <td class="text-center align-middle">{{ promotion.promotion_name || '-' }}</td>
    <td class="text-center align-middle">{{ promotion.promotion_status_start || '-' }}</td>
    <td class="text-center align-middle">{{ promotion.promotion_status_expire || '-' }}</td>
    <td class="text-center align-middle">{{ promotion.promotion_rate_discount || '-' }}</td>
    <td class="text-center align-middle fs-3"><i class="bi bi-pencil-square" type="button" style="color: #CAC403;"  data-bs-toggle="modal" data-bs-target="#EditModal" @click="openEditPromotionModal(promotion)" ></i></td>
    <td class="text-center align-middle fs-3"><i class="bi bi-trash3-fill" type="button" style="color: red;" @click="deletePromotion(promotion.promotion_id)"></i></td>
  </tr>
</tbody>
    </table>
  </div>
</template>

<style>
  .datepicker {
    width: 100%;
  }
  .datepicker .datepicker__calendar {
    width: 100%;
  }
  .datepicker .datepicker__calendar table {
    width: 100%;
  }
</style>
