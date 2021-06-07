import { Injectable } from '@angular/core';
import { ChartGroup, iChartsGroup } from './mx-text.model';

@Injectable({providedIn:'root'})
export class MxText {

    dateStringOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    timeStringOptions = { hour: '2-digit', minute: '2-digit' }

    constructor () { }


    normalize(text: string) {
        var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
            to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
            mapping:any = {};

        for ( var i = 0, j = from.length; i < j; i++ )
            mapping[ from.charAt( i ) ] = to.charAt( i );

            var ret = [];
            for ( var i = 0, j = text.length; i < j; i++ ) {
                var c = text.charAt( i );
                if ( mapping.hasOwnProperty( text.charAt( i ) ) )
                    ret.push( mapping[ c ] );
                else
                    ret.push( c );
            }
            return ret.join( '' );
    }

    capitalize( text: string, lower = false ) {
        return ( lower ? text.toLowerCase() : text ).replace( /(?:^|\s|["'([{])+\S/g, match => match.toUpperCase() );
    }

    changeStringNumber(number: number) {
        switch (number) {
          case 0: return 'cero'; case 1: return 'uno'; case 2: return 'dos'; case 3: return 'tres'; case 4: return 'cuatro'; case 5: return 'cinco'; case 6: return 'seis'; case 7: return 'siete'; case 8: return 'ocho'; case 9: return 'nueve'; default: return ''}
    }

    generateRandomText(digits?: number) {
        return Math.random().toString( 36 )
            .substring( digits ? digits : 6 );
    }

    generateColorCode() {
    var randomColor = Math.floor( Math.random() * 16777215 ).toString( 16 );
    return randomColor;
  }

    stringifyDate(date: Date) {
        return date.toLocaleDateString('es-MX', this.dateStringOptions)
    }

    stringifyShortDate( date: Date ) {
        return date.toLocaleDateString( 'es-MX' )
    }

    stringifyTime( date: Date ) {
        return date.toLocaleTimeString( 'es-MX', this.timeStringOptions )
    }

/** Prevent print chart on keypress.
   * @note No works in keydown o keyup event
   */
  onlyAllow( list: ChartGroup[], event: any) {
    var k;
    k = event.charCode;  // k = event.keyCode;  (Both can be used)
    if ( ( list.includes("letters") && (k > 96 && k < 123))
      || ( list.includes("numbers") && (k >= 48 && k <= 57))
      || ( list.includes("backspace") && k == 8)
      || ( list.includes("space") && k == 32)
      || ( list.includes("comma") && k == 188)
      || ( list.includes("dash") && k == 189)
      || ( list.includes("perdiod") && k == 190)
      || ( list.includes("underscore") && k == 95)
    ) { return true }
    else {return false}
  }

}



