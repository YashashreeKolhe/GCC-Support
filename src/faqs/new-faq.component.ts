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
  }

  initializeFaq(): FAQ {
    return {
      Id: -1,
      Question: '',
      Answer: '',
      AnsweredBy: '',
      Category: 'Others'
    }
  }

  onChangeCategory(newCategory: string) {
    if (newCategory === 'Others') {
      this.names = this.nameStore;
    }
    this.names = this.nameStore.filter(name => name.Category === newCategory);
  }

  onSaveFaq() {
    if (this.validateFaq()) {
      this.faqsService.saveFaq(this.faq);
      this.toastr.success('FAQ saved successfully', 'Success');
      this.save.emit();
    } else {
      this.toastr.success('Please fill all the fields!', 'Success');
    }
  }

  validateFaq() {
    if (this.faq.Question === '' && this.faq.Answer === '') {
      return false;
    }
    return true;
  }
}
