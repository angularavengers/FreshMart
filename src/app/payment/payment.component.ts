import { PaymentService } from './../services/payment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private _paymentService: PaymentService) { }

  ngOnInit() {
    this.initPayment();
  }

  /* Adding Payment vendor to head tag dynamically */
  loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  async initPayment() {
    const isScripLoaded = await this.loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!isScripLoaded) {
      alert('Payment is failed to load. Are you online?')
      return
    }
    /* createOrder */
    this._paymentService.createOrder({}).subscribe((orderData) => {
      this.payWithRazor(orderData.id, orderData.keyCode)
    });
  }

  payWithRazor(order_id, keyCode) {
    /*Todo  Sourabh- Need to create interface for options */
    const options: any = {
      key: keyCode, /* testing only need to serve from backend...*/
      amount: 12111, /* Pass User Value here */
      currency: 'INR',
      name: '', // company name or product name
      description: '',  // product description
      image: './assets/logo_w.png', // company logo or product image
      order_id: order_id, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#9acd32'
      }
    };
    /*Todo Soruabh:  For testing only- will handle this from backend..*/
    options.handler = ((response, error) => {
      /* We will write backend to handle and check signature */
      options.response = response;
      console.log(response);
      console.log(options);
    });
    options.modal.ondismiss = (() => {
      /* Todo: Sourabh need to add toster model when cancel or can give confirmation model...*/
      alert('Transaction cancelled.');
    });
    const rzp = new this._paymentService.getWindow.Razorpay(options);
    rzp.open();
  }

}
