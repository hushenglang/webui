package web.bean;

import java.io.Serializable;
import java.util.Date;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import web.util.BigDecimalAdapter;
import web.util.DateAdapter;
import web.util.LongAdapter;

@XmlRootElement(name="FCustomerInfoParam")  
public class FcustomerInfoParam extends SimpleVo   implements Serializable{
	private static final long serialVersionUID = -4956854472857082727L;
	@XmlAttribute(name="FCUSTOMER_INFO_ID")
	@XmlJavaTypeAdapter(value=LongAdapter.class)
	private Long fcustomerInfoId;
	@XmlAttribute(name="ACCOUNT_LEVEL")
	private String accountLevel;
	@XmlAttribute(name="ACCOUNT_CATEGORY")
	private String accountCategory;
	@XmlAttribute(name="TITLE")
	private String title;
	@XmlAttribute(name="CHINESE_NAME")
	private String chineseName;
	@XmlAttribute(name="ENGLISH_NAME")
	private String englishName;
	@XmlAttribute(name="ACCOUNT_NO")
	private String accountNo;
	@XmlAttribute(name="ACCOUNT_STATUS")
	private String accountStatus;
	@XmlAttribute(name="MARITAL_STATUS")
	private String maritalStatus;
	@XmlAttribute(name="COMPANY_TYPE")
	private String companyType;
	@XmlAttribute(name="ID_DOCUMENT")
	private String idDocument;
	@XmlAttribute(name="ID_DOCUMENT_NUMBER")
	private String idDocumentNumber;
	@XmlAttribute(name="ID_DOCUMENT_COUNTRY")
	private String idDocumentCountry;
	@XmlAttribute(name="DATE_OF_BIRTH")
	@XmlJavaTypeAdapter(value=DateAdapter.class)
	private java.util.Date dateOfBirth;
	@XmlAttribute(name="NATIONALITY")
	private String nationality;
	@XmlAttribute(name="HOME_PHONE")
	private String homePhone;
	@XmlAttribute(name="OFFICE_PHONE")
	private String officePhone;
	@XmlAttribute(name="MOBILE_PHONE")
	private String mobilePhone;
	@XmlAttribute(name="FAX")
	private String fax;
	@XmlAttribute(name="ADDRESS0")
	private String address0;
	@XmlAttribute(name="ADDRESS1")
	private String address1;
	@XmlAttribute(name="ADDRESS2")
	private String address2;
	@XmlAttribute(name="PROVINCE")
	private String province;
	@XmlAttribute(name="COUNTRY")
	private String country;
	@XmlAttribute(name="POSTAL_CODE")
	private String postalCode;
	@XmlAttribute(name="EMAIL")
	private String email;
	@XmlAttribute(name="BILL_COLLECTION_METHOD")
	private String billCollectionMethod;
	@XmlAttribute(name="CONTACT_TITLE")
	private String contactTitle;
	@XmlAttribute(name="CONTACT_CHINESE_NAME")
	private String contactChineseName;
	@XmlAttribute(name="CONTACT_ENGLISH_NAME")
	private String contactEnglishName;
	@XmlAttribute(name="CONTACT_MARITAL_STATUS")
	private String contactMaritalStatus;
	@XmlAttribute(name="CONTACT_DOCUMENT")
	private String contactDocument;
	@XmlAttribute(name="CONTACT_ID_DOCUMENT_NUMBER")
	private String contactIdDocumentNumber;
	@XmlAttribute(name="CONTACT_ID_DOCUMENT_COUNTRY")
	private String contactIdDocumentCountry;
	@XmlAttribute(name="CONTACT_DATE_OF_BIRTH")
	@XmlJavaTypeAdapter(value=DateAdapter.class)
	private java.util.Date contactDateOfBirth;
	@XmlAttribute(name="CONTACT_NATIONALITY")
	private String contactNationality;
	@XmlAttribute(name="CONTACT_HOME_PHONE")
	private String contactHomePhone;
	@XmlAttribute(name="CONTACT_OFFICE_PHONE")
	private String contactOfficePhone;
	@XmlAttribute(name="CONTACT_MOBILE_PHONE")
	private String contactMobilePhone;
	@XmlAttribute(name="CONTACT_FAX")
	private String contactFax;
	@XmlAttribute(name="CONTACT_ADDRESS0")
	private String contactAddress0;
	@XmlAttribute(name="CONTACT_ADDRESS1")
	private String contactAddress1;
	@XmlAttribute(name="CONTACT_ADDRESS2")
	private String contactAddress2;
	@XmlAttribute(name="CONTACT_PROVINCE")
	private String contactProvince;
	@XmlAttribute(name="CONTACT_COUNTRY")
	private String contactCountry;
	@XmlAttribute(name="CONTACT_POSTAL_CODE")
	private String contactPostalCode;
	@XmlAttribute(name="CONTACT_EMAIL")
	private String contactEmail;
	@XmlAttribute(name="EQUITY_TYPE")
	private String equityType;
	@XmlAttribute(name="EQUITY_CHINESE_NAME")
	private String equityChineseName;
	@XmlAttribute(name="EQUITY_ENGLISH_NAME")
	private String equityEnglishName;
	@XmlAttribute(name="EQUITY_DOCUMENT")
	private String equityDocument;
	@XmlAttribute(name="EQUITY_DOCUMENT_NUMBER")
	private String equityDocumentNumber;
	@XmlAttribute(name="EQUITY_ADDRESS0")
	private String equityAddress0;
	@XmlAttribute(name="EQUITY_ADDRESS1")
	private String equityAddress1;
	@XmlAttribute(name="EQUITY_ADDRESS2")	
	private String equityAddress2;
	@XmlAttribute(name="EQUITY_PROVINCE")
	private String equityProvince;
	@XmlAttribute(name="EQUITY_COUNTRY")
	private String equityCountry;
	@XmlAttribute(name="PRINCIPALFINAL")
	private String principalfinal;
	@XmlAttribute(name="PRINCIPAL_CHINESE_NAME")
	private String principalChineseName;
	@XmlAttribute(name="PRINCIPAL_ENGLISH_NAME")
	private String principalEnglishName;
	@XmlAttribute(name="PRINCIPAL_DOCUMENT")
	private String principalDocument;
	@XmlAttribute(name="PRINCIPAL_ID_DOCUMENT_NUMBER")
	private String principalIdDocumentNumber;
	@XmlAttribute(name="PRINCIPAL_ADDRESS0")
	private String principalAddress0;
	@XmlAttribute(name="PRINCIPAL_ADDRESS1")
	private String principalAddress1;
	@XmlAttribute(name="PRINCIPAL_ADDRESS2")
	private String principalAddress2;
	@XmlAttribute(name="PRINCIPAL_PROVINCE")
	private String principalProvince;
	@XmlAttribute(name="PRINCIPAL_COUNTRY")
	private String principalCountry;
	@XmlAttribute(name="IS_AGENT")
	private String isAgent;
	@XmlAttribute(name="AGENT_NAME")
	private String agentName;
	@XmlAttribute(name="BANK_PAY_METHOD")
	private String bankPayMethod;
	@XmlAttribute(name="BANK_NATIONALITY")
	private String bankNationality;
	@XmlAttribute(name="BANK")
	private String bank;
	@XmlAttribute(name="BANK_ACCOUNT_CITY")
	private String accountCity;
	@XmlAttribute(name="BANK_ACCOUNT_BRANCH")
	private String accountBranch;
	@XmlAttribute(name="BANK_ACCOUNT_NAME")
	private String accountName;
	@XmlAttribute(name="BANK_ACCOUNT_NUMBER")
	private String accountNumber;
	@XmlAttribute(name="BANK_ACCOUNT_TYPE")
	private String accountType;
	@XmlAttribute(name="INTERNATIONAL_REMITTANCE_CODE")
	private String internationalRemittanceCode;
	@XmlAttribute(name="BANK_ADDRESS_0")
	private String bankAddress0;
	@XmlAttribute(name="BANK_ADDRESS_1")
	private String bankAddress1;
	@XmlAttribute(name="BANK_ADDRESS_2")
	private String bankAddress2;
	@XmlAttribute(name="BANK_PROVINCE")
	private String bankProvince;
	@XmlAttribute(name="BANK_COUNTRY")
	private String bankCountry;
	@XmlAttribute(name="CURRENCY")
	private String currency;
	@XmlAttribute(name="BUSINESS_WORKS_TATUS")
	private String businessWorksTatus;
	@XmlAttribute(name="BUSINESS_WORK_TYPE")
	private String businessWorkType;
	@XmlAttribute(name="BUSINESS_WORK_POSITION")
	private String businessWorkPosition;
	@XmlAttribute(name="BUSINESS_WORK_EMPLOYER")
	private String businessWorkEmployer;
	@XmlAttribute(name="BUSINESS_WORK_COMPANY_PHONE")
	private String businessWorkCompanyPhone;
	@XmlAttribute(name="BUSINESS_WORK_PERIOD")
	private String businessWorkPeriod;
	@XmlAttribute(name="FINANCE_STATUS_EQUITY")
	@XmlJavaTypeAdapter(value=BigDecimalAdapter.class)
	private java.math.BigDecimal financeStatusEquity;
	@XmlAttribute(name="FINANCE_STATUS_CURRENT_ASSETS")
	@XmlJavaTypeAdapter(value=BigDecimalAdapter.class)
	private java.math.BigDecimal financeStatusCurrentAssets;
	@XmlAttribute(name="FINANCE_STATUS_YEARLY_INCOME")
	private String financeStatusYearlyIncome;
	@XmlAttribute(name="FINANCE_STATUS_SHARE_ISSUED")
	@XmlJavaTypeAdapter(value=BigDecimalAdapter.class)
	private java.math.BigDecimal financeStatusShareIssued;
	@XmlAttribute(name="INVEST_EXPERIENCE")
	private String investExperience;
	@XmlAttribute(name="INVEST_PRODUCT_EXPERIENCE")
	private String investProductExperience;
	@XmlAttribute(name="INVEST_YEAR")
	private String investYear;
	@XmlAttribute(name="INVEST_PURPOSE")
	private String investPurpose;
	@XmlAttribute(name="INFORMATION_FROM")
	private String informationFrom;
	@XmlAttribute(name="FILES_BANK_FILES")
	private String filesBankFiles;
	@XmlAttribute(name="FILES_ID_FILES")
	private String filesIdFiles;
	@XmlAttribute(name="FILES_ADDRESS")
	private String filesAddress;
	@XmlAttribute(name="FILES_BANK_CONFIRM")
	private String filesBankConfirm;
	@XmlAttribute(name="FILES_CONSENT")
	private String filesConsent;
	@XmlAttribute(name="MAX_CREDIT_COUNT")
	@XmlJavaTypeAdapter(value=BigDecimalAdapter.class)
	private java.math.BigDecimal maxCreditCount;
	@XmlAttribute(name="CREDIT_AUTHORIZE_DATE")
	@XmlJavaTypeAdapter(value=DateAdapter.class)
	private java.util.Date creditAuthorizeDate;
	@XmlAttribute(name="TRANSACTION_SMS")
	private String transactionSms;
	@XmlAttribute(name="DEPOSIT_SMS")
	private String depositSms;
	@XmlAttribute(name="WITHDRAW_SMS")
	private String withdrawSms;
	@XmlAttribute(name="CGSE_SMS")
	private String cgseSms;
	@XmlAttribute(name="LOGINNAMEPWD_SMS")
	private String loginnamepwdSms;
	@XmlAttribute(name="SHORTENMONEY_SMS")
	private String shortenmoneySms;
	@XmlAttribute(name="LOCKWITHDRAWAL")
	private String lockWithDrawal;
	@XmlAttribute(name="CASHINTRADENO")
	private String cashinTradeNo;
	@XmlAttribute(name="last_print")
	@XmlJavaTypeAdapter(value=DateAdapter.class)
	private Date lastPrint;
	@XmlAttribute(name="PLATFORM")
	private String platform;
	@XmlAttribute(name="STATUS")
	private String status; 

	/**
	 * @return the fcustomerInfoId
	 */
	  @XmlTransient 
	public long getFcustomerInfoId() {
		return fcustomerInfoId;
	}
	/**
	 * @return the accountLevel
	 */
	  @XmlTransient 
	public String getAccountLevel() {
		return accountLevel;
	}
	/**
	 * @return the accountCategory
	 */
	  @XmlTransient 
	public String getAccountCategory() {
		return accountCategory;
	}
	/**
	 * @return the title
	 */
	  @XmlTransient 
	public String getTitle() {
		return title;
	}
	/**
	 * @return the chineseName
	 */
	  @XmlTransient 
	public String getChineseName() {
		return chineseName;
	}
	/**
	 * @return the englishName
	 */
	  @XmlTransient 
	public String getEnglishName() {
		return englishName;
	}
	/**
	 * @return the accountNo
	 */
	  @XmlTransient 
	public String getAccountNo() {
		return accountNo;
	}
	/**
	 * @return the accountStatus
	 */
	  @XmlTransient 
	public String getAccountStatus() {
		return accountStatus;
	}
	/**
	 * @return the maritalStatus
	 */
	  @XmlTransient 
	public String getMaritalStatus() {
		return maritalStatus;
	}
	/**
	 * @return the companyType
	 */
	  @XmlTransient 
	public String getCompanyType() {
		return companyType;
	}
	/**
	 * @return the idDocument
	 */
	  @XmlTransient 
	public String getIdDocument() {
		return idDocument;
	}
	/**
	 * @return the idDocumentNumber
	 */
	  @XmlTransient 
	public String getIdDocumentNumber() {
		return idDocumentNumber;
	}
	/**
	 * @return the idDocumentCountry
	 */
	  @XmlTransient 
	public String getIdDocumentCountry() {
		return idDocumentCountry;
	}
	/**
	 * @return the dateOfBirth
	 */
	  @XmlTransient 
	public java.util.Date getDateOfBirth() {
		return dateOfBirth;
	}
	/**
	 * @return the nationality
	 */
	  @XmlTransient 
	public String getNationality() {
		return nationality;
	}
	/**
	 * @return the homePhone
	 */
	  @XmlTransient 
	public String getHomePhone() {
		return homePhone;
	}
	/**
	 * @return the officePhone
	 */
	  @XmlTransient 
	public String getOfficePhone() {
		return officePhone;
	}
	/**
	 * @return the mobilePhone
	 */
	  @XmlTransient 
	public String getMobilePhone() {
		return mobilePhone;
	}
	/**
	 * @return the fax
	 */
	  @XmlTransient 
	public String getFax() {
		return fax;
	}
	/**
	 * @return the address0
	 */
	  @XmlTransient 
	public String getAddress0() {
		return address0;
	}
	/**
	 * @return the address1
	 */
	  @XmlTransient 
	public String getAddress1() {
		return address1;
	}
	/**
	 * @return the address2
	 */
	  @XmlTransient 
	public String getAddress2() {
		return address2;
	}
	/**
	 * @return the province
	 */
	  @XmlTransient 
	public String getProvince() {
		return province;
	}
	/**
	 * @return the country
	 */
	  @XmlTransient 
	public String getCountry() {
		return country;
	}
	/**
	 * @return the postalCode
	 */
	  @XmlTransient 
	public String getPostalCode() {
		return postalCode;
	}
	/**
	 * @return the email
	 */
	  @XmlTransient 
	public String getEmail() {
		return email;
	}
	/**
	 * @return the billCollectionMethod
	 */
	  @XmlTransient 
	public String getBillCollectionMethod() {
		return billCollectionMethod;
	}
	/**
	 * @return the contactTitle
	 */
	  @XmlTransient 
	public String getContactTitle() {
		return contactTitle;
	}
	/**
	 * @return the contactChineseName
	 */
	  @XmlTransient
	public String getContactChineseName() {
		return contactChineseName;
	}
	/**
	 * @return the contactEnglishName
	 */
	  @XmlTransient
	public String getContactEnglishName() {
		return contactEnglishName;
	}
	/**
	 * @return the contactMaritalStatus
	 */
	  @XmlTransient
	public String getContactMaritalStatus() {
		return contactMaritalStatus;
	}
	/**
	 * @return the contactDocument
	 */
	  @XmlTransient
	public String getContactDocument() {
		return contactDocument;
	}
	/**
	 * @return the contactIdDocumentNumber
	 */
	  @XmlTransient
	public String getContactIdDocumentNumber() {
		return contactIdDocumentNumber;
	}
	/**
	 * @return the contactIdDocumentCountry
	 */
	  @XmlTransient
	public String getContactIdDocumentCountry() {
		return contactIdDocumentCountry;
	}
	/**
	 * @return the contactDateOfBirth
	 */
	  @XmlTransient
	public java.util.Date getContactDateOfBirth() {
		return contactDateOfBirth;
	}
	/**
	 * @return the contactNationality
	 */
	  @XmlTransient
	public String getContactNationality() {
		return contactNationality;
	}
	/**
	 * @return the contactHomePhone
	 */
	  @XmlTransient
	public String getContactHomePhone() {
		return contactHomePhone;
	}
	/**
	 * @return the contactOfficePhone
	 */
	  @XmlTransient
	public String getContactOfficePhone() {
		return contactOfficePhone;
	}
	/**
	 * @return the contactMobilePhone
	 */
	  @XmlTransient
	public String getContactMobilePhone() {
		return contactMobilePhone;
	}
	/**
	 * @return the contactFax
	 */
	  @XmlTransient
	public String getContactFax() {
		return contactFax;
	}
	/**
	 * @return the contactAddress0
	 */
	  @XmlTransient
	public String getContactAddress0() {
		return contactAddress0;
	}
	/**
	 * @return the contactAddress1
	 */
	  @XmlTransient
	public String getContactAddress1() {
		return contactAddress1;
	}
	/**
	 * @return the contactAddress2
	 */
	  @XmlTransient
	public String getContactAddress2() {
		return contactAddress2;
	}
	/**
	 * @return the contactProvince
	 */
	  @XmlTransient
	public String getContactProvince() {
		return contactProvince;
	}
	/**
	 * @return the contactCountry
	 */
	  @XmlTransient
	public String getContactCountry() {
		return contactCountry;
	}
	/**
	 * @return the contactPostalCode
	 */
	  @XmlTransient
	public String getContactPostalCode() {
		return contactPostalCode;
	}
	/**
	 * @return the contactEmail
	 */
	  @XmlTransient
	public String getContactEmail() {
		return contactEmail;
	}
	/**
	 * @return the equityType
	 */
	  @XmlTransient
	public String getEquityType() {
		return equityType;
	}
	/**
	 * @return the equityChineseName
	 */
	  @XmlTransient
	public String getEquityChineseName() {
		return equityChineseName;
	}
	/**
	 * @return the equityEnglishName
	 */
	  @XmlTransient
	public String getEquityEnglishName() {
		return equityEnglishName;
	}
	/**
	 * @return the equityDocument
	 */
	  @XmlTransient
	public String getEquityDocument() {
		return equityDocument;
	}
	/**
	 * @return the equityDocumentNumber
	 */
	  @XmlTransient
	public String getEquityDocumentNumber() {
		return equityDocumentNumber;
	}
	/**
	 * @return the equityAddress0
	 */
	  @XmlTransient
	public String getEquityAddress0() {
		return equityAddress0;
	}
	/**
	 * @return the equityAddress1
	 */
	  @XmlTransient
	public String getEquityAddress1() {
		return equityAddress1;
	}
	/**
	 * @return the equityAddress2
	 */
	  @XmlTransient
	public String getEquityAddress2() {
		return equityAddress2;
	}
	/**
	 * @return the equityProvince
	 */
	  @XmlTransient
	public String getEquityProvince() {
		return equityProvince;
	}
	/**
	 * @return the equityCountry
	 */
	  @XmlTransient
	public String getEquityCountry() {
		return equityCountry;
	}
	/**
	 * @return the principalfinal
	 */
	  @XmlTransient
	public String getPrincipalfinal() {
		return principalfinal;
	}
	/**
	 * @return the principalChineseName
	 */
	  @XmlTransient
	public String getPrincipalChineseName() {
		return principalChineseName;
	}
	/**
	 * @return the principalEnglishName
	 */
	  @XmlTransient
	public String getPrincipalEnglishName() {
		return principalEnglishName;
	}
	/**
	 * @return the principalDocument
	 */
	  @XmlTransient
	public String getPrincipalDocument() {
		return principalDocument;
	}
	/**
	 * @return the principalIdDocumentNumber
	 */
	  @XmlTransient
	public String getPrincipalIdDocumentNumber() {
		return principalIdDocumentNumber;
	}
	/**
	 * @return the principalAddress0
	 */
	  @XmlTransient
	public String getPrincipalAddress0() {
		return principalAddress0;
	}
	/**
	 * @return the principalAddress1
	 */
	  @XmlTransient
	public String getPrincipalAddress1() {
		return principalAddress1;
	}
	/**
	 * @return the principalAddress2
	 */
	  @XmlTransient
	public String getPrincipalAddress2() {
		return principalAddress2;
	}
	/**
	 * @return the principalProvince
	 */
	  @XmlTransient
	public String getPrincipalProvince() {
		return principalProvince;
	}
	/**
	 * @return the principalCountry
	 */
	  @XmlTransient
	public String getPrincipalCountry() {
		return principalCountry;
	}
	/**
	 * @return the isAgent
	 */
	  @XmlTransient
	public String getIsAgent() {
		return isAgent;
	}
	/**
	 * @return the agentName
	 */
	  @XmlTransient
	public String getAgentName() {
		return agentName;
	}
	/**
	 * @return the bankPayMethod
	 */
	  @XmlTransient
	public String getBankPayMethod() {
		return bankPayMethod;
	}
	/**
	 * @return the bankNationality
	 */
	  @XmlTransient
	public String getBankNationality() {
		return bankNationality;
	}
	/**
	 * @return the bank
	 */
	  @XmlTransient
	public String getBank() {
		return bank;
	}
	/**
	 * @return the accountCity
	 */
	  @XmlTransient
	public String getAccountCity() {
		return accountCity;
	}
	/**
	 * @return the accountBranch
	 */
	  @XmlTransient
	public String getAccountBranch() {
		return accountBranch;
	}
	/**
	 * @return the accountName
	 */
	  @XmlTransient
	public String getAccountName() {
		return accountName;
	}
	/**
	 * @return the accountNumber
	 */
	  @XmlTransient
	public String getAccountNumber() {
		return accountNumber;
	}
	/**
	 * @return the accountType
	 */
	  @XmlTransient
	public String getAccountType() {
		return accountType;
	}
	/**
	 * @return the internationalRemittanceCode
	 */
	  @XmlTransient
	public String getInternationalRemittanceCode() {
		return internationalRemittanceCode;
	}
	/**
	 * @return the bankAddress0
	 */
	  @XmlTransient
	public String getBankAddress0() {
		return bankAddress0;
	}
	/**
	 * @return the bankAddress1
	 */
	  @XmlTransient
	public String getBankAddress1() {
		return bankAddress1;
	}
	/**
	 * @return the bankAddress2
	 */
	  @XmlTransient
	public String getBankAddress2() {
		return bankAddress2;
	}
	/**
	 * @return the bankProvince
	 */
	  @XmlTransient
	public String getBankProvince() {
		return bankProvince;
	}
	/**
	 * @return the bankCountry
	 */
	  @XmlTransient
	public String getBankCountry() {
		return bankCountry;
	}
	/**
	 * @return the currency
	 */
	  @XmlTransient
	public String getCurrency() {
		return currency;
	}
	/**
	 * @return the businessWorksTatus
	 */
	  @XmlTransient
	public String getBusinessWorksTatus() {
		return businessWorksTatus;
	}
	/**
	 * @return the businessWorkType
	 */
	  @XmlTransient
	public String getBusinessWorkType() {
		return businessWorkType;
	}
	/**
	 * @return the businessWorkPosition
	 */
	  @XmlTransient
	public String getBusinessWorkPosition() {
		return businessWorkPosition;
	}
	/**
	 * @return the businessWorkEmployer
	 */
	  @XmlTransient
	public String getBusinessWorkEmployer() {
		return businessWorkEmployer;
	}
	/**
	 * @return the businessWorkCompanyPhone
	 */
	  @XmlTransient
	public String getBusinessWorkCompanyPhone() {
		return businessWorkCompanyPhone;
	}
	/**
	 * @return the businessWorkPeriod
	 */
	  @XmlTransient
	public String getBusinessWorkPeriod() {
		return businessWorkPeriod;
	}
	/**
	 * @return the financeStatusEquity
	 */
	  @XmlTransient
	public java.math.BigDecimal getFinanceStatusEquity() {
		return financeStatusEquity;
	}
	/**
	 * @return the financeStatusCurrentAssets
	 */
	  @XmlTransient
	public java.math.BigDecimal getFinanceStatusCurrentAssets() {
		return financeStatusCurrentAssets;
	}
	/**
	 * @return the financeStatusYearlyIncome
	 */
	  @XmlTransient
	public String getFinanceStatusYearlyIncome() {
		return financeStatusYearlyIncome;
	}
	/**
	 * @return the financeStatusShareIssued
	 */
	  @XmlTransient
	public java.math.BigDecimal getFinanceStatusShareIssued() {
		return financeStatusShareIssued;
	}
	/**
	 * @return the investExperience
	 */
	  @XmlTransient
	public String getInvestExperience() {
		return investExperience;
	}
	/**
	 * @return the investProductExperience
	 */
	  @XmlTransient
	public String getInvestProductExperience() {
		return investProductExperience;
	}
	/**
	 * @return the investYear
	 */
	  @XmlTransient
	public String getInvestYear() {
		return investYear;
	}
	/**
	 * @return the investPurpose
	 */
	  @XmlTransient
	public String getInvestPurpose() {
		return investPurpose;
	}
	/**
	 * @return the informationFrom
	 */
	  @XmlTransient
	public String getInformationFrom() {
		return informationFrom;
	}
	/**
	 * @return the filesBankFiles
	 */
	  @XmlTransient
	public String getFilesBankFiles() {
		return filesBankFiles;
	}
	/**
	 * @return the filesIdFiles
	 */
	  @XmlTransient
	public String getFilesIdFiles() {
		return filesIdFiles;
	}
	/**
	 * @return the filesAddress
	 */
	  @XmlTransient
	public String getFilesAddress() {
		return filesAddress;
	}
	/**
	 * @return the filesBankConfirm
	 */
	  @XmlTransient
	public String getFilesBankConfirm() {
		return filesBankConfirm;
	}
	/**
	 * @return the filesConsent
	 */
	  @XmlTransient
	public String getFilesConsent() {
		return filesConsent;
	}
	/**
	 * @return the maxCreditCount
	 */
	  @XmlTransient
	public java.math.BigDecimal getMaxCreditCount() {
		return maxCreditCount;
	}
	/**
	 * @return the creditAuthorizeDate
	 */
	  @XmlTransient
	public java.util.Date getCreditAuthorizeDate() {
		return creditAuthorizeDate;
	}
	/**
	 * @return the transactionSms
	 */
	  @XmlTransient
	public String getTransactionSms() {
		return transactionSms;
	}
	/**
	 * @return the depositSms
	 */
	  @XmlTransient
	public String getDepositSms() {
		return depositSms;
	}
	/**
	 * @return the withdrawSms
	 */
	  @XmlTransient
	public String getWithdrawSms() {
		return withdrawSms;
	}
	/**
	 * @return the cgseSms
	 */
	  @XmlTransient
	public String getCgseSms() {
		return cgseSms;
	}
	/**
	 * @return the loginnamepwdSms
	 */
	  @XmlTransient
	public String getLoginnamepwdSms() {
		return loginnamepwdSms;
	}
	/**
	 * @return the shortenmoneySms
	 */
	  @XmlTransient
	public String getShortenmoneySms() {
		return shortenmoneySms;
	}
	/**
	 * @return the lockWithDrawal
	 */
	  @XmlTransient
	public String getLockWithDrawal() {
		return lockWithDrawal;
	}
	/**
	 * @return the cashinTradeNo
	 */
	  @XmlTransient
	public String getCashinTradeNo() {
		return cashinTradeNo;
	}
	/**
	 * @return the lastPrint
	 */
	  @XmlTransient
	public Date getLastPrint() {
		return lastPrint;
	}

	/**
	 * @return the platform
	 */
	  @XmlTransient
	public String getPlatform() {
		return platform;
	}
	/**
	 * @return the status
	 */
	  @XmlTransient
	public String getStatus() {
		return status;
	}

	/**
	 * @param fcustomerInfoId the fcustomerInfoId to set
	 */
	public void setFcustomerInfoId(long fcustomerInfoId) {
		this.fcustomerInfoId = fcustomerInfoId;
	}
	/**
	 * @param accountLevel the accountLevel to set
	 */
	public void setAccountLevel(String accountLevel) {
		this.accountLevel = accountLevel;
	}
	/**
	 * @param accountCategory the accountCategory to set
	 */
	public void setAccountCategory(String accountCategory) {
		this.accountCategory = accountCategory;
	}
	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	/**
	 * @param chineseName the chineseName to set
	 */
	public void setChineseName(String chineseName) {
		this.chineseName = chineseName;
	}
	/**
	 * @param englishName the englishName to set
	 */
	public void setEnglishName(String englishName) {
		this.englishName = englishName;
	}
	/**
	 * @param accountNo the accountNo to set
	 */
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	/**
	 * @param accountStatus the accountStatus to set
	 */
	public void setAccountStatus(String accountStatus) {
		this.accountStatus = accountStatus;
	}
	/**
	 * @param maritalStatus the maritalStatus to set
	 */
	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}
	/**
	 * @param companyType the companyType to set
	 */
	public void setCompanyType(String companyType) {
		this.companyType = companyType;
	}
	/**
	 * @param idDocument the idDocument to set
	 */
	public void setIdDocument(String idDocument) {
		this.idDocument = idDocument;
	}
	/**
	 * @param idDocumentNumber the idDocumentNumber to set
	 */
	public void setIdDocumentNumber(String idDocumentNumber) {
		this.idDocumentNumber = idDocumentNumber;
	}
	/**
	 * @param idDocumentCountry the idDocumentCountry to set
	 */
	public void setIdDocumentCountry(String idDocumentCountry) {
		this.idDocumentCountry = idDocumentCountry;
	}
	/**
	 * @param dateOfBirth the dateOfBirth to set
	 */
	public void setDateOfBirth(java.util.Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	/**
	 * @param nationality the nationality to set
	 */
	public void setNationality(String nationality) {
		this.nationality = nationality;
	}
	/**
	 * @param homePhone the homePhone to set
	 */
	public void setHomePhone(String homePhone) {
		this.homePhone = homePhone;
	}
	/**
	 * @param officePhone the officePhone to set
	 */
	public void setOfficePhone(String officePhone) {
		this.officePhone = officePhone;
	}
	/**
	 * @param mobilePhone the mobilePhone to set
	 */
	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}
	/**
	 * @param fax the fax to set
	 */
	public void setFax(String fax) {
		this.fax = fax;
	}
	/**
	 * @param address0 the address0 to set
	 */
	public void setAddress0(String address0) {
		this.address0 = address0;
	}
	/**
	 * @param address1 the address1 to set
	 */
	public void setAddress1(String address1) {
		this.address1 = address1;
	}
	/**
	 * @param address2 the address2 to set
	 */
	public void setAddress2(String address2) {
		this.address2 = address2;
	}
	/**
	 * @param province the province to set
	 */
	public void setProvince(String province) {
		this.province = province;
	}
	/**
	 * @param country the country to set
	 */
	public void setCountry(String country) {
		this.country = country;
	}
	/**
	 * @param postalCode the postalCode to set
	 */
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	/**
	 * @param billCollectionMethod the billCollectionMethod to set
	 */
	public void setBillCollectionMethod(String billCollectionMethod) {
		this.billCollectionMethod = billCollectionMethod;
	}
	/**
	 * @param contactTitle the contactTitle to set
	 */
	public void setContactTitle(String contactTitle) {
		this.contactTitle = contactTitle;
	}
	/**
	 * @param contactChineseName the contactChineseName to set
	 */
	public void setContactChineseName(String contactChineseName) {
		this.contactChineseName = contactChineseName;
	}
	/**
	 * @param contactEnglishName the contactEnglishName to set
	 */
	public void setContactEnglishName(String contactEnglishName) {
		this.contactEnglishName = contactEnglishName;
	}
	/**
	 * @param contactMaritalStatus the contactMaritalStatus to set
	 */
	public void setContactMaritalStatus(String contactMaritalStatus) {
		this.contactMaritalStatus = contactMaritalStatus;
	}
	/**
	 * @param contactDocument the contactDocument to set
	 */
	public void setContactDocument(String contactDocument) {
		this.contactDocument = contactDocument;
	}
	/**
	 * @param contactIdDocumentNumber the contactIdDocumentNumber to set
	 */
	public void setContactIdDocumentNumber(String contactIdDocumentNumber) {
		this.contactIdDocumentNumber = contactIdDocumentNumber;
	}
	/**
	 * @param contactIdDocumentCountry the contactIdDocumentCountry to set
	 */
	public void setContactIdDocumentCountry(String contactIdDocumentCountry) {
		this.contactIdDocumentCountry = contactIdDocumentCountry;
	}
	/**
	 * @param contactDateOfBirth the contactDateOfBirth to set
	 */
	public void setContactDateOfBirth(java.util.Date contactDateOfBirth) {
		this.contactDateOfBirth = contactDateOfBirth;
	}
	/**
	 * @param contactNationality the contactNationality to set
	 */
	public void setContactNationality(String contactNationality) {
		this.contactNationality = contactNationality;
	}
	/**
	 * @param contactHomePhone the contactHomePhone to set
	 */
	public void setContactHomePhone(String contactHomePhone) {
		this.contactHomePhone = contactHomePhone;
	}
	/**
	 * @param contactOfficePhone the contactOfficePhone to set
	 */
	public void setContactOfficePhone(String contactOfficePhone) {
		this.contactOfficePhone = contactOfficePhone;
	}
	/**
	 * @param contactMobilePhone the contactMobilePhone to set
	 */
	public void setContactMobilePhone(String contactMobilePhone) {
		this.contactMobilePhone = contactMobilePhone;
	}
	/**
	 * @param contactFax the contactFax to set
	 */
	public void setContactFax(String contactFax) {
		this.contactFax = contactFax;
	}
	/**
	 * @param contactAddress0 the contactAddress0 to set
	 */
	public void setContactAddress0(String contactAddress0) {
		this.contactAddress0 = contactAddress0;
	}
	/**
	 * @param contactAddress1 the contactAddress1 to set
	 */
	public void setContactAddress1(String contactAddress1) {
		this.contactAddress1 = contactAddress1;
	}
	/**
	 * @param contactAddress2 the contactAddress2 to set
	 */
	public void setContactAddress2(String contactAddress2) {
		this.contactAddress2 = contactAddress2;
	}
	/**
	 * @param contactProvince the contactProvince to set
	 */
	public void setContactProvince(String contactProvince) {
		this.contactProvince = contactProvince;
	}
	/**
	 * @param contactCountry the contactCountry to set
	 */
	public void setContactCountry(String contactCountry) {
		this.contactCountry = contactCountry;
	}
	/**
	 * @param contactPostalCode the contactPostalCode to set
	 */
	public void setContactPostalCode(String contactPostalCode) {
		this.contactPostalCode = contactPostalCode;
	}
	/**
	 * @param contactEmail the contactEmail to set
	 */
	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}
	/**
	 * @param equityType the equityType to set
	 */
	public void setEquityType(String equityType) {
		this.equityType = equityType;
	}
	/**
	 * @param equityChineseName the equityChineseName to set
	 */
	public void setEquityChineseName(String equityChineseName) {
		this.equityChineseName = equityChineseName;
	}
	/**
	 * @param equityEnglishName the equityEnglishName to set
	 */
	public void setEquityEnglishName(String equityEnglishName) {
		this.equityEnglishName = equityEnglishName;
	}
	/**
	 * @param equityDocument the equityDocument to set
	 */
	public void setEquityDocument(String equityDocument) {
		this.equityDocument = equityDocument;
	}
	/**
	 * @param equityDocumentNumber the equityDocumentNumber to set
	 */
	public void setEquityDocumentNumber(String equityDocumentNumber) {
		this.equityDocumentNumber = equityDocumentNumber;
	}
	/**
	 * @param equityAddress0 the equityAddress0 to set
	 */
	public void setEquityAddress0(String equityAddress0) {
		this.equityAddress0 = equityAddress0;
	}
	/**
	 * @param equityAddress1 the equityAddress1 to set
	 */
	public void setEquityAddress1(String equityAddress1) {
		this.equityAddress1 = equityAddress1;
	}
	/**
	 * @param equityAddress2 the equityAddress2 to set
	 */
	public void setEquityAddress2(String equityAddress2) {
		this.equityAddress2 = equityAddress2;
	}
	/**
	 * @param equityProvince the equityProvince to set
	 */
	public void setEquityProvince(String equityProvince) {
		this.equityProvince = equityProvince;
	}
	/**
	 * @param equityCountry the equityCountry to set
	 */
	public void setEquityCountry(String equityCountry) {
		this.equityCountry = equityCountry;
	}
	/**
	 * @param principalfinal the principalfinal to set
	 */
	public void setPrincipalfinal(String principalfinal) {
		this.principalfinal = principalfinal;
	}
	/**
	 * @param principalChineseName the principalChineseName to set
	 */
	public void setPrincipalChineseName(String principalChineseName) {
		this.principalChineseName = principalChineseName;
	}
	/**
	 * @param principalEnglishName the principalEnglishName to set
	 */
	public void setPrincipalEnglishName(String principalEnglishName) {
		this.principalEnglishName = principalEnglishName;
	}
	/**
	 * @param principalDocument the principalDocument to set
	 */
	public void setPrincipalDocument(String principalDocument) {
		this.principalDocument = principalDocument;
	}
	/**
	 * @param principalIdDocumentNumber the principalIdDocumentNumber to set
	 */
	public void setPrincipalIdDocumentNumber(String principalIdDocumentNumber) {
		this.principalIdDocumentNumber = principalIdDocumentNumber;
	}
	/**
	 * @param principalAddress0 the principalAddress0 to set
	 */
	public void setPrincipalAddress0(String principalAddress0) {
		this.principalAddress0 = principalAddress0;
	}
	/**
	 * @param principalAddress1 the principalAddress1 to set
	 */
	public void setPrincipalAddress1(String principalAddress1) {
		this.principalAddress1 = principalAddress1;
	}
	/**
	 * @param principalAddress2 the principalAddress2 to set
	 */
	public void setPrincipalAddress2(String principalAddress2) {
		this.principalAddress2 = principalAddress2;
	}
	/**
	 * @param principalProvince the principalProvince to set
	 */
	public void setPrincipalProvince(String principalProvince) {
		this.principalProvince = principalProvince;
	}
	/**
	 * @param principalCountry the principalCountry to set
	 */
	public void setPrincipalCountry(String principalCountry) {
		this.principalCountry = principalCountry;
	}
	/**
	 * @param isAgent the isAgent to set
	 */
	public void setIsAgent(String isAgent) {
		this.isAgent = isAgent;
	}
	/**
	 * @param agentName the agentName to set
	 */
	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}
	/**
	 * @param bankPayMethod the bankPayMethod to set
	 */
	public void setBankPayMethod(String bankPayMethod) {
		this.bankPayMethod = bankPayMethod;
	}
	/**
	 * @param bankNationality the bankNationality to set
	 */
	public void setBankNationality(String bankNationality) {
		this.bankNationality = bankNationality;
	}
	/**
	 * @param bank the bank to set
	 */
	public void setBank(String bank) {
		this.bank = bank;
	}
	/**
	 * @param accountCity the accountCity to set
	 */
	public void setAccountCity(String accountCity) {
		this.accountCity = accountCity;
	}
	/**
	 * @param accountBranch the accountBranch to set
	 */
	public void setAccountBranch(String accountBranch) {
		this.accountBranch = accountBranch;
	}
	/**
	 * @param accountName the accountName to set
	 */
	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}
	/**
	 * @param accountNumber the accountNumber to set
	 */
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	/**
	 * @param accountType the accountType to set
	 */
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
	/**
	 * @param internationalRemittanceCode the internationalRemittanceCode to set
	 */
	public void setInternationalRemittanceCode(String internationalRemittanceCode) {
		this.internationalRemittanceCode = internationalRemittanceCode;
	}
	/**
	 * @param bankAddress0 the bankAddress0 to set
	 */
	public void setBankAddress0(String bankAddress0) {
		this.bankAddress0 = bankAddress0;
	}
	/**
	 * @param bankAddress1 the bankAddress1 to set
	 */
	public void setBankAddress1(String bankAddress1) {
		this.bankAddress1 = bankAddress1;
	}
	/**
	 * @param bankAddress2 the bankAddress2 to set
	 */
	public void setBankAddress2(String bankAddress2) {
		this.bankAddress2 = bankAddress2;
	}
	/**
	 * @param bankProvince the bankProvince to set
	 */
	public void setBankProvince(String bankProvince) {
		this.bankProvince = bankProvince;
	}
	/**
	 * @param bankCountry the bankCountry to set
	 */
	public void setBankCountry(String bankCountry) {
		this.bankCountry = bankCountry;
	}
	/**
	 * @param currency the currency to set
	 */
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	/**
	 * @param businessWorksTatus the businessWorksTatus to set
	 */
	public void setBusinessWorksTatus(String businessWorksTatus) {
		this.businessWorksTatus = businessWorksTatus;
	}
	/**
	 * @param businessWorkType the businessWorkType to set
	 */
	public void setBusinessWorkType(String businessWorkType) {
		this.businessWorkType = businessWorkType;
	}
	/**
	 * @param businessWorkPosition the businessWorkPosition to set
	 */
	public void setBusinessWorkPosition(String businessWorkPosition) {
		this.businessWorkPosition = businessWorkPosition;
	}
	/**
	 * @param businessWorkEmployer the businessWorkEmployer to set
	 */
	public void setBusinessWorkEmployer(String businessWorkEmployer) {
		this.businessWorkEmployer = businessWorkEmployer;
	}
	/**
	 * @param businessWorkCompanyPhone the businessWorkCompanyPhone to set
	 */
	public void setBusinessWorkCompanyPhone(String businessWorkCompanyPhone) {
		this.businessWorkCompanyPhone = businessWorkCompanyPhone;
	}
	/**
	 * @param businessWorkPeriod the businessWorkPeriod to set
	 */
	public void setBusinessWorkPeriod(String businessWorkPeriod) {
		this.businessWorkPeriod = businessWorkPeriod;
	}
	/**
	 * @param financeStatusEquity the financeStatusEquity to set
	 */
	public void setFinanceStatusEquity(java.math.BigDecimal financeStatusEquity) {
		this.financeStatusEquity = financeStatusEquity;
	}
	/**
	 * @param financeStatusCurrentAssets the financeStatusCurrentAssets to set
	 */
	public void setFinanceStatusCurrentAssets(java.math.BigDecimal financeStatusCurrentAssets) {
		this.financeStatusCurrentAssets = financeStatusCurrentAssets;
	}
	/**
	 * @param financeStatusYearlyIncome the financeStatusYearlyIncome to set
	 */
	public void setFinanceStatusYearlyIncome(String financeStatusYearlyIncome) {
		this.financeStatusYearlyIncome = financeStatusYearlyIncome;
	}
	/**
	 * @param financeStatusShareIssued the financeStatusShareIssued to set
	 */
	public void setFinanceStatusShareIssued(java.math.BigDecimal financeStatusShareIssued) {
		this.financeStatusShareIssued = financeStatusShareIssued;
	}
	/**
	 * @param investExperience the investExperience to set
	 */
	public void setInvestExperience(String investExperience) {
		this.investExperience = investExperience;
	}
	/**
	 * @param investProductExperience the investProductExperience to set
	 */
	public void setInvestProductExperience(String investProductExperience) {
		this.investProductExperience = investProductExperience;
	}
	/**
	 * @param investYear the investYear to set
	 */
	public void setInvestYear(String investYear) {
		this.investYear = investYear;
	}
	/**
	 * @param investPurpose the investPurpose to set
	 */
	public void setInvestPurpose(String investPurpose) {
		this.investPurpose = investPurpose;
	}
	/**
	 * @param informationFrom the informationFrom to set
	 */
	public void setInformationFrom(String informationFrom) {
		this.informationFrom = informationFrom;
	}
	/**
	 * @param filesBankFiles the filesBankFiles to set
	 */
	public void setFilesBankFiles(String filesBankFiles) {
		this.filesBankFiles = filesBankFiles;
	}
	/**
	 * @param filesIdFiles the filesIdFiles to set
	 */
	public void setFilesIdFiles(String filesIdFiles) {
		this.filesIdFiles = filesIdFiles;
	}
	/**
	 * @param filesAddress the filesAddress to set
	 */
	public void setFilesAddress(String filesAddress) {
		this.filesAddress = filesAddress;
	}
	/**
	 * @param filesBankConfirm the filesBankConfirm to set
	 */
	public void setFilesBankConfirm(String filesBankConfirm) {
		this.filesBankConfirm = filesBankConfirm;
	}
	/**
	 * @param filesConsent the filesConsent to set
	 */
	public void setFilesConsent(String filesConsent) {
		this.filesConsent = filesConsent;
	}
	/**
	 * @param maxCreditCount the maxCreditCount to set
	 */
	public void setMaxCreditCount(java.math.BigDecimal maxCreditCount) {
		this.maxCreditCount = maxCreditCount;
	}
	/**
	 * @param creditAuthorizeDate the creditAuthorizeDate to set
	 */
	public void setCreditAuthorizeDate(java.util.Date creditAuthorizeDate) {
		this.creditAuthorizeDate = creditAuthorizeDate;
	}
	/**
	 * @param transactionSms the transactionSms to set
	 */
	public void setTransactionSms(String transactionSms) {
		this.transactionSms = transactionSms;
	}
	/**
	 * @param depositSms the depositSms to set
	 */
	public void setDepositSms(String depositSms) {
		this.depositSms = depositSms;
	}
	/**
	 * @param withdrawSms the withdrawSms to set
	 */
	public void setWithdrawSms(String withdrawSms) {
		this.withdrawSms = withdrawSms;
	}
	/**
	 * @param cgseSms the cgseSms to set
	 */
	public void setCgseSms(String cgseSms) {
		this.cgseSms = cgseSms;
	}
	/**
	 * @param loginnamepwdSms the loginnamepwdSms to set
	 */
	public void setLoginnamepwdSms(String loginnamepwdSms) {
		this.loginnamepwdSms = loginnamepwdSms;
	}
	/**
	 * @param shortenmoneySms the shortenmoneySms to set
	 */
	public void setShortenmoneySms(String shortenmoneySms) {
		this.shortenmoneySms = shortenmoneySms;
	}
	/**
	 * @param lockWithDrawal the lockWithDrawal to set
	 */
	public void setLockWithDrawal(String lockWithDrawal) {
		this.lockWithDrawal = lockWithDrawal;
	}
	/**
	 * @param cashinTradeNo the cashinTradeNo to set
	 */
	public void setCashinTradeNo(String cashinTradeNo) {
		this.cashinTradeNo = cashinTradeNo;
	}
	/**
	 * @param lastPrint the lastPrint to set
	 */
	public void setLastPrint(Date lastPrint) {
		this.lastPrint = lastPrint;
	}

	/**
	 * @param platform the platform to set
	 */
	public void setPlatform(String platform) {
		this.platform = platform;
	}
	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	
	
}
