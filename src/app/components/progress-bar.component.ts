import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-progress-bar',
    templateUrl:'./progress-bar.component.html',
    styleUrls:['./progress-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnInit, OnChanges {
    @Input() targetVolume!: number;
    @Input() barOptions!: any;

    greenPercent!: string;
    bluePercentage!: string;

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {
        this.bluePercentage = this.calcPercentage(this.targetVolume,this.barOptions);
        
        const closedValue = this.minSearch(this.barOptions,this.targetVolume)
        this.greenPercent = this.calcPercentage(closedValue,this.barOptions);

    }
    calcPercentage(value:number,data:any):string {
        return value * 100 / data.at(-1).volume  + '%'
    }
    private minSearch(data:Array<{prize:number,volume:number}>,target:number):number {
        let closedValue = 0
        data.forEach(({volume},idx:number) => {
            if(target === volume) closedValue =  volume;
            if(target > volume) closedValue = volume;
            return null;
        });
        return closedValue
        
    }
}