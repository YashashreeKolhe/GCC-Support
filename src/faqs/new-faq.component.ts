import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FAQ, Name } from './model';
import { FaqsService } from 'src/services/faqs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'new-faq',
  templateUrl: './new-faq.component.html',
})
export class  NewFaqComponent {
  @Input() faq: FAQ;
  @Input() mode: number;
  @Output() exit: EventEmitter<void> = new EventEmitter<void>();
  @Output() save: EventEmitter<void> = new EventEmitter<void>();

  names: Name[];
  nameStore: Name[];
  categories: string[];

  constructor(
    private faqsService: FaqsService,
    private toastr: ToastrService,) {}

  ngOnInit() {
    if (this.faq === null) {
      this.faq = this.initializeFaq();
    }
    this.categories = this.faqsService.loadCategories();
    this.nameStore = this.faqsService.loadNames();
    this.onChangeCategory('Others');
  }

  initializeFaq(): FAQ {
    return {
      question: '',
      answer: '',
      answeredBy: '',
      category: 'Others'
    }
  }

  onChangeCategory(newCategory: string) {
    if (newCategory === 'Others') {
      this.names = this.nameStore;
    }
    this.names = this.nameStore.filter(name => name.Category === newCategory);
  }

  async onSaveFaq() {
    if (this.validateFaq()) {
      await this.faqsService.saveFaq(this.faq).toPromise();
      this.toastr.success('FAQ saved successfully', 'Success');
      this.save.emit();
    } else {
      this.toastr.error('Please fill all the fields!', 'Error');
    }
  }

  validateFaq() {
    if (this.faq.question === '' && this.faq.answer === '') {
      return false;
    }
    return true;
  }
}
