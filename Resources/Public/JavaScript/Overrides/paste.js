/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
import DocumentService from"@typo3/core/document-service.js";import DataHandler from"@typo3/backend/ajax-data-handler.js";import{default as Modal}from"@typo3/backend/modal.js";import Severity from"@typo3/backend/severity.js";import"@typo3/backend/element/icon-element.js";import{SeverityEnum}from"@typo3/backend/enum/severity.js";import RegularEvent from"@typo3/core/event/regular-event.js";class Paste{constructor(t){this.itemOnClipboardUid=0,this.itemOnClipboardTitle="",this.copyMode="",this.elementIdentifier=".t3js-page-ce",this.pasteAfterLinkTemplate="",this.pasteIntoLinkTemplate="",this.itemOnClipboardUid=t.itemOnClipboardUid,this.itemOnClipboardTitle=t.itemOnClipboardTitle,this.copyMode=t.copyMode,DocumentService.ready().then((()=>{document.querySelectorAll(".t3js-page-columns").length>0&&(this.generateButtonTemplates(),this.activatePasteIcons(),this.initializeEvents())}))}static determineColumn(t){const e=t.closest("[data-colpos]");return parseInt(e?.dataset?.colpos??"0",10)}static determineTxContainerParent(t){const e=t.closest("[data-tx-container-parent]");return parseInt(e?.dataset?.txContainerParent??"0",10)}initializeEvents(){new RegularEvent("click",((t,e)=>{t.preventDefault(),this.activatePasteModal(e)})).delegateTo(document,".t3js-paste")}generateButtonTemplates(){this.itemOnClipboardUid&&(this.pasteAfterLinkTemplate='<button type="button" class="t3js-paste t3js-paste'+(this.copyMode?"-"+this.copyMode:"")+' t3js-paste-after btn btn-default btn-sm" title="'+TYPO3.lang?.pasteAfterRecord+'"><typo3-backend-icon identifier="actions-document-paste-into" size="small"></typo3-backend-icon></button>',this.pasteIntoLinkTemplate='<button type="button" class="t3js-paste t3js-paste'+(this.copyMode?"-"+this.copyMode:"")+' t3js-paste-into btn btn-default btn-sm" title="'+TYPO3.lang?.pasteIntoColumn+'"><typo3-backend-icon identifier="actions-document-paste-into" size="small"></typo3-backend-icon></button>')}activatePasteIcons(){this.pasteAfterLinkTemplate&&this.pasteIntoLinkTemplate&&document.querySelectorAll(".t3js-page-new-ce").forEach((t=>{const e=t.parentElement.dataset.page?this.pasteIntoLinkTemplate:this.pasteAfterLinkTemplate;t.append(document.createRange().createContextualFragment(e))}))}activatePasteModal(t){const e=(TYPO3.lang["paste.modal.title.paste"]||"Paste record")+': "'+this.itemOnClipboardTitle+'"',a=TYPO3.lang["paste.modal.paste"]||"Do you want to paste the record to this position?";let n=[];n=[{text:TYPO3.lang["paste.modal.button.cancel"]||"Cancel",active:!0,btnClass:"btn-default",trigger:(t,e)=>e.hideModal()},{text:TYPO3.lang["paste.modal.button.paste"]||"Paste",btnClass:"btn-"+Severity.getCssClass(SeverityEnum.warning),trigger:(e,a)=>{a.hideModal(),this.execute(t)}}],Modal.show(e,a,SeverityEnum.warning,n)}execute(t){const e=Paste.determineColumn(t),a=Paste.determineTxContainerParent(t),n=t.closest(this.elementIdentifier),s=n.dataset.uid;let o;o=void 0===s?parseInt(n.dataset.page,10):0-parseInt(s,10);const i={CB:{paste:"tt_content|"+o,pad:"normal",update:{colPos:e,sys_language_uid:parseInt(t.closest("[data-language-uid]").dataset.languageUid,10),tx_container_parent:a}}};DataHandler.process(i).then((t=>{t.hasErrors||window.location.reload()}))}}export default Paste;